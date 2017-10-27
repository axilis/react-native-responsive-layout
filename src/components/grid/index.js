import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, StyleSheet } from 'react-native';

import GridBreakpointsProp from './props';
import { DirectionProp, ContainerSizeProp } from '../../shared/props';
import { DEFAULT_SIZES } from '../../shared';
import determineSizeClass from './methods';
import SizeSubscriber from './Subscriber';

const sharedStyle = {
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  flex: 0,
};

const style = StyleSheet.create({
  horizontal: {
    ...sharedStyle,
    flexDirection: 'row',
  },
  vertical: {
    ...sharedStyle,
    flexDirection: 'column',
  },
  stretch: {
    flex: 1,
  },
});


/**
 * Grid that defines how nested `Section` and `Block` components should behave.
 *
 * You can determine what object is being referenced to determine size using
 * `relativeTo`, as well on which sizes should size classes cascade using
 * `breakpoints` and control flow of objects using `direction`.
 *
 * Using `relativeTo` set to 'self' can have performance impact since it must
 * determine whether children components are impacted by resize.
 */
class Grid extends Component {
  constructor(props) {
    super();

    const subscriber = new SizeSubscriber();
    let width = 0;
    let height = 0;

    // If relative to window we need to manually determine values when mounted.
    // To track changes we add on change handlers on `componentWillMount` and
    // `componentWillUnmount`.
    if (props.relativeTo === 'window') {
      ({ width, height } = Dimensions.get('window'));
      subscriber.update(width, height);
    }

    this.state = {
      breakpoints: props.breakpoints,
      containerSizeClass: this.determineSize(props.breakpoints, props.direction, width, height),
      referenceSizeProvider: subscriber,
    };
  }

  getChildContext = () => ({
    contentDirection: this.props.direction,
    containerSizeClass: this.state.containerSizeClass,
    containerStretch: this.props.stretch,
    referenceSizeProvider: this.state.referenceSizeProvider,
  });

  componentWillMount() {
    Dimensions.addEventListener('change', this.windowResizeHandler.bind(this));
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.windowResizeHandler.bind(this));
  }

  onLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    this.updateSize(width, height);
  };


  /**
   * Helper function that calculates all state (context) values.
   */
  determineSize = (breakpoints, direction, width, height) => determineSizeClass(
    breakpoints,
    (direction === 'vertical' ? width : height),
  );

  /**
   * Handler for window size changes when grid is relative to it.
   */
  windowResizeHandler = ({ window: { width, height } }) => {
    // Only trigger handler if Grid is relative to window size.
    if (this.props.relativeTo !== 'window') {
      return;
    }

    this.updateSize(width, height);
  };

  /**
   * Handler that will only update state if size really happened to avoid
   * useless re-rendering.
   */
  updateSize = (width, height) => {
    const size = this.determineSize(this.state.breakpoints, this.props.direction, width, height);

    // Propagate size change to subscribed entities.
    this.state.referenceSizeProvider.update(width, height);

    if (size !== this.state.containerSizeClass) {
      this.setState({ containerSizeClass: size });
    }
  }


  render() {
    // Only enable onLayout handler when Grid is relative to its own size.
    const onLayoutHandler = (this.props.relativeTo === 'self' ? this.onLayout : null);

    return (
      <View
        style={[
          (this.props.direction === 'horizontal' ? style.horizontal : style.vertical),
          this.props.stretch ? style.stretch : null,
          this.props.style,
        ]}
        onLayout={onLayoutHandler}
      >
        { this.state.containerSizeClass ? this.props.children : null }
      </View>
    );
  }
}


Grid.propTypes = {
  breakpoints: GridBreakpointsProp,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  relativeTo: PropTypes.oneOf(['window', 'self']),
  style: PropTypes.shape({}),
  stretch: PropTypes.bool,

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};


Grid.defaultProps = {
  breakpoints: DEFAULT_SIZES,
  direction: 'vertical',
  relativeTo: 'window',
  style: {},
  stretch: false,
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
   * Width of element that is observed to determine cascading of sizes.
   * It can be either Grid itself or Window depending on `relativeTo` property.
   */
  referenceSizeProvider: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }),
};


export default Grid;
