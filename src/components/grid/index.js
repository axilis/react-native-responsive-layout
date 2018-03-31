import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';

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
 * @augments {Component<{breakpoints: Object, horizontal: boolean, scrollable: boolean, relativeTo: 'window' | 'self', stretchable: boolean, style: any, children: any}>}
 */
/* eslint-enable */
class Grid extends Component {
  constructor(props) {
    super(props);

    let width = 0;
    let height = 0;
    if (props.relativeTo === 'window') {
      ({ width, height } = Dimensions.get('window'));
    }

    this.state = {
      containerSizeClass: this.determineSize(props.breakpoints, props.horizontal, width, height),
      containerSizeProvider: new SizeSubscriber(),
    };
  }

  getChildContext = () => ({
    contentDirection: (this.props.horizontal ? HORIZONTAL : VERTICAL),
    containerSizeClass: this.state.containerSizeClass,
    containerStretch: this.props.stretchable,
    containerSizeProvider: this.state.containerSizeProvider,
  });

  componentDidMount() {
    Dimensions.addEventListener('change', this.windowResizeHandler);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.windowResizeHandler);
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
    if (this.props.relativeTo === 'window') {
      this.updateSizeClass(width, height);
    }
  };

  /**
   * Handler that will only update state if size really happened to avoid
   * useless re-rendering.
   */
  updateSizeClass = (width, height) => {
    const size = this.determineSize(this.props.breakpoints, this.props.horizontal, width, height);

    if (size !== this.state.containerSizeClass) {
      this.setState({ containerSizeClass: size });
    }
  }

  updateSizeProvider = (width, height) => {
    // Propagate size change to subscribed entities.
    this.state.containerSizeProvider.update(width, height);
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
        {this.state.containerSizeClass ? this.props.children : null}
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
  relativeTo: PropTypes.oneOf(['window', 'self']),
  style: PropTypes.shape({}),
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
   * Determines how content should flow in both Section and Block element. It
   * is always based on provided direction prop.
   */
  contentDirection: DirectionProp,
  /**
   * Grid will determine containerSizeClass that children will receive based
   * on current grid size and merge of provided and default breakpoints.
   */
  containerSizeClass: ContainerSizeProp,
  /**
   * Whether grid should stretch available space.
   */
  containerStretch: PropTypes.bool,
  /**
   * Provider of changes in grids width and height.
   */
  containerSizeProvider: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }),
};


export default Grid;
