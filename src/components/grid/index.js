import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, StyleSheet } from 'react-native';

import GridBreakpointsProp from './props';
import { DirectionProp, ContainerSizeProp } from '../../shared/props';
import { mergeBreakpoints, determineSizeClass } from './methods';

const sharedStyle = {
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  flex: 1,
  backgroundColor: 'yellowgreen',
};

const style = StyleSheet.create({
  horizontal: {
    ...sharedStyle,
    flexDirection: 'row',
  },
  vertical: {
    ...sharedStyle,
    flexDirection: 'column',
  }
});

const determineValues = (breakpoints, direction, width, height) => ({
  containerSizeClass: determineSizeClass(breakpoints, (direction === 'vertical' ? width : height)),
  referenceWidth: width,
  referenceHeight: height,
});

class Grid extends Component {
  constructor(props) {
    super();

    console.log('Constructor');
    const mergedBreakpoints = mergeBreakpoints(props.breakpoints);
    let width = 0;
    let height = 0;

    // If relative to window we need to manually determine values.
    if (props.relativeTo === 'window') {
      ({ width, height } = Dimensions.get('window'));
    }

    this.state = {
      mergedBreakpoints,
      ...determineValues(mergedBreakpoints, props.direction, width, height),
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
    console.log('Relayout trigggered', width, height);

    this.updateSize(width, height);
  };

  windowResizeHandler = ({ window: { width, height } }) => {
    // Only trigger handler if Grid is relative to window size.
    if (this.props.relativeTo !== 'window') {
      return;
    }

    console.log('Window Resize', width, height);

    this.updateSize(width, height);
  };


  /**
   * Conservative handler.
   */
  updateSize(width, height) {
    const values = determineValues(this.state.mergedBreakpoints, this.props.direction, width, height);

    if (
      values.containerSizeClass !== this.state.containerSizeClass ||
      values.referenceWidth !== this.state.referenceWidth ||
      values.referenceHeight !== this.state.referenceHeight
    ) {
      console.log('UPDATE SIZE, CHANGED: ', this.state, values);
      this.setState(values);
    }
  }


  render() {
    console.log('Rerendering Grid component', this.state.referenceWidth, this.state.referenceHeight);

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
  breakpoints: {},
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

  referenceWidth: PropTypes.number.isRequired,
  referenceHeight: PropTypes.number.isRequired,
};

export default Grid;
