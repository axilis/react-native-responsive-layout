import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, ViewPropTypes } from 'react-native';

import {
  BREAKPOINT_VALUES,
  SIZE_NAMES,
  HORIZONTAL,
  VERTICAL,
} from '../../shared/constants';

import { ContainerSizeProp, DirectionProp } from '../../shared/props';
import { determineSizeClass } from './methods';
import { BreakpointsProp } from './props';
import SizeSubscriber from './Subscriber';
import Scrollable from './Scrollable';


const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stretchable: {
    flex: 1,
  },
});

/* eslint-disable */
/**
 * Grid that defines how nested `Section` and `Block` components should behave.
 *
 * You can determine what object is being referenced to determine size using
 * `relativeTo`, as well on which sizes should size classes cascade using
 * `breakpoints` and control flow of objects using `direction`.
 *
 * Using `relativeTo` set to 'self' can have performance impact since it must
 * determine whether children components are impacted by resize.
 *
 * @augments {Component<{breakpoints?: Object, horizontal?: boolean, scrollable?: boolean, relativeTo?: 'window' | 'self' | 'parent', stretchable?: boolean, style?: any, children: any}>}
 */
/* eslint-enable */
class Grid extends Component {
  constructor(props, context) {
    super(props, context);

    let width = 0;
    let height = 0;

    // Subscriber for components nested inside that that take grid size.
    const gridComponentSizeProvider = new SizeSubscriber();
    // Create subscriber used to resolve parent size dependencies in children.
    let childrenReferenceSizeSubscriber;

    /*
      Regarding inheritance of reference size provider:
      This table shows depending on current grid and parent grid what should
      be provided further down the chain.

             (parent -- first outer grid)
             | parent |  self  | window |
      -------|--------------------------|
      parent | parent | parent | parent |
        self |  self  |  self  |  self  |
      window |  null  |  null  |  null  |
      -------|--------------------------|

    */

    if (props.relativeTo === 'window') {
      // When size is not inherited from the parent, do not pass anything.
      childrenReferenceSizeSubscriber = null;
      // Fetch dimensions immediately and subscribe later.
      ({ width, height } = Dimensions.get('window'));
    } else if (props.relativeTo === 'self') {
      // When it is based on current element, pass on the current element.
      childrenReferenceSizeSubscriber = gridComponentSizeProvider;
      // Dimensions will be determined once onLayout is called.
    } else if (props.relativeTo === 'parent') {
      // When it is based on parent, simply pass it further down the chain.
      childrenReferenceSizeSubscriber = context.referenceSizeProvider;

      // When parent element is relative to window, we need to fetch dimensions
      // manually just like in relativeTo='window' case, since it won't get
      // re-rendered until the orientation changes so it would have the default
      // values of 0, 0.
      if (context.referenceSizeProvider === null) {
        ({ width, height } = Dimensions.get('window'));
      }

      // When parent element is relative to self, simply the fact that this
      // component will be rendered will trigger onLayout of parent element.
    }

    this.state = {
      gridSizeClass: this.determineSize(props.breakpoints, props.horizontal, width, height),
      gridSizeProvider: gridComponentSizeProvider,
      referenceSizeProvider: childrenReferenceSizeSubscriber,
    };
  }

  getChildContext = () => ({
    gridContentDirection: (this.props.horizontal ? HORIZONTAL : VERTICAL),
    gridSizeClass: this.state.gridSizeClass,
    gridStretch: this.props.stretchable,
    gridSizeProvider: this.state.gridSizeProvider,
    referenceSizeProvider: this.state.referenceSizeProvider,
  });

  componentDidMount() {
    Dimensions.addEventListener('change', this.windowResizeHandler);

    // Subscribe to parent updates if they provide them and parent provides them
    if (this.props.relativeTo === 'parent') {
      if (this.context.referenceSizeProvider) {
        this.context.referenceSizeProvider.subscribe(this.updateSizeClass);
      }
    }
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.windowResizeHandler);

    // On unmount we need to unsubscribe from parent subscriber.
    if (this.props.relativeTo === 'parent') {
      if (this.context.referenceSizeProvider) {
        this.context.referenceSizeProvider.unsubscribe(this.updateSizeClass);
      }
    }
  }

  onLayoutHandler = ({ nativeEvent: { layout: { width, height } } }) => {
    if (this.props.relativeTo === 'self') {
      this.updateSizeClass(width, height);
    }
    this.updateSizeProvider(width, height);
  };

  /**
   * Helper function that calculates all state (context) values.
   */
  determineSize = (breakpoints, horizontal, width, height) => determineSizeClass(
    SIZE_NAMES,
    breakpoints,
    (horizontal ? height : width),
  );

  /**
   * Handler for window size changes when grid is relative to it.
   */
  windowResizeHandler = ({ window: { width, height } }) => {
    // Look into constructor to find more details about this implementation.
    if (
      (this.props.relativeTo === 'window') ||
      (this.props.relativeTo === 'parent' && this.context.referenceSizeProvider === null)
    ) {
      this.updateSizeClass(width, height);
    }
  };

  /**
   * Handler that will only update state if size really happened to avoid
   * useless re-rendering.
   */
  updateSizeClass = (width, height) => {
    const size = this.determineSize(this.props.breakpoints, this.props.horizontal, width, height);
    if (size !== this.state.gridSizeClass) {
      this.setState({ gridSizeClass: size });
    }
  }

  updateSizeProvider = (width, height) => {
    // Propagate size change to subscribed entities.
    this.state.gridSizeProvider.update(width, height);
  }

  render() {
    const view = (
      <View
        style={[
          (this.props.horizontal ? styles.horizontal : styles.vertical),
          this.props.stretchable ? styles.stretchable : null,
          this.props.style,
        ]}
        onLayout={this.onLayoutHandler}
      >
        {this.state.gridSizeClass ? this.props.children : null}
      </View>
    );

    if (!this.props.scrollable) {
      return view;
    }

    return (
      <Scrollable
        horizontal={this.props.horizontal}
        stretch={this.props.stretchable}
      >
        {view}
      </Scrollable>
    );
  }
}


Grid.propTypes = {
  breakpoints: BreakpointsProp,
  horizontal: PropTypes.bool,
  scrollable: PropTypes.bool,
  relativeTo: PropTypes.oneOf(['parent', 'self', 'window']),
  style: ViewPropTypes.style,
  stretchable: PropTypes.bool,

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};


Grid.defaultProps = {
  breakpoints: BREAKPOINT_VALUES,
  horizontal: false,
  scrollable: false,
  relativeTo: 'window',
  style: {},
  stretchable: false,
};


Grid.childContextTypes = {
  /**
   * Determines how content should flow in both Section and Block element.
   * It is always based on provided direction prop.
   */
  gridContentDirection: DirectionProp,
  /**
   * Grid will determine gridSizeClass that children will receive based
   * on current grid size and merge of provided and default breakpoints.
   */
  gridSizeClass: ContainerSizeProp,
  /**
   * Whether grid should stretch available space.
   */
  gridStretch: PropTypes.bool,
  /**
   * Provider of width and height changes in containing grids. Components nested
   * inside grid that depend on its size will subscribe to this.
   */
  gridSizeProvider: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }),
  /**
   * Provider of width and height changes in grids that refer to parent.
   * Grids nested inside that are relative to its parent will subscribe to this.
   */
  referenceSizeProvider: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }),
};

Grid.contextTypes = {
  referenceSizeProvider: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }),
};

export default Grid;
