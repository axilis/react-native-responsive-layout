import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, StyleSheet } from 'react-native';

import GridBreakpointsProp from './props';
import { DirectionProp, ContainerSizeProp } from '../../shared/props';
import { DEFAULT_SIZES } from '../../shared';
import { determineSizeClass } from './methods';

const sharedStyle = {
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  flex: 1,
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
});


/**
 * Grid that defines how nested `Section` and `Box` components should behave.
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

    let width = 0;
    let height = 0;

    // If relative to window we need to manually determine values when mounted.
    // To track changes we add on change handlers on `componentWillMount` and
    // `componentWillUnmount`.
    if (props.relativeTo === 'window') {
      ({ width, height } = Dimensions.get('window'));
    }

    this.state = {
      breakpoints: props.breakpoints,
      ...this.determineValues(props.breakpoints, props.direction, width, height),
    };
  }

  getChildContext = () => ({
    contentDirection: this.props.direction,
    containerSizeClass: this.state.containerSizeClass,
    referenceWidth: this.state.referenceWidth,
    referenceHeight: this.state.referenceHeight,
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
  determineValues = (breakpoints, direction, width, height) => ({
    containerSizeClass: determineSizeClass(
      breakpoints,
      (direction === 'vertical' ? width : height),
    ),
    referenceWidth: width,
    referenceHeight: height,
  });

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
    const values = this.determineValues(
      this.state.breakpoints,
      this.props.direction,
      width,
      height,
    );

    if (
      values.containerSizeClass !== this.state.containerSizeClass ||
      values.referenceWidth !== this.state.referenceWidth ||
      values.referenceHeight !== this.state.referenceHeight
    ) {
      this.setState(values);
    }
  }


  render() {
    // Only enable onLayout handler when Grid is relative to its own size.
    const onLayoutHandler = (this.props.relativeTo === 'self' ? this.onLayout : null);

    return (
      <View style={(this.props.direction === 'horizontal' ? style.horizontal : style.vertical)} onLayout={onLayoutHandler}>
        { this.state.containerSizeClass ? this.props.children : null }
      </View>
    );
  }
}


Grid.propTypes = {
  breakpoints: GridBreakpointsProp,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  relativeTo: PropTypes.oneOf(['window', 'self']),

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};


Grid.defaultProps = {
  breakpoints: DEFAULT_SIZES,
  direction: 'vertical',
  relativeTo: 'window',
};


Grid.childContextTypes = {
  /**
   * Determines how content should flow in both Section and Box element. It
   * is always based on provided direction prop.
   */
  contentDirection: DirectionProp,
  /**
   * Grid will determine containerSizeClass that children will receive based
   * on current grid size and merge of provided and default breakpoints.
   */
  containerSizeClass: ContainerSizeProp,
  /**
   * Width of element that is observed to determine cascading of sizes.
   * It can be either Grid itself or Window depending on `relativeTo` property.
   */
  referenceWidth: PropTypes.number.isRequired,
  /**
   * Height of element that is observed to determine cascading of sizes.
   * It can be either Grid itself or Window depending on `relativeTo` property.
   */
  referenceHeight: PropTypes.number.isRequired,
};


export default Grid;
