import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import BoxProps from './props';
import { determineSize, isHidden } from './methods';
import { roundPercentage, GRID_UNITS } from '../../shared';
import { DirectionProp, ContainerSizeProp } from '../../shared/props';

// We need to ensure that auto sizing wouldn't collapse to zero width when there
// is enough elements to already fill the line.
const ONE_UNIT_WIDTH = `${roundPercentage(100 / GRID_UNITS)}%`;

const style = StyleSheet.create({
  baseStyle: {
    justifyContent: 'flex-start',
  },
  autoSize: {
    flex: 1,
    flexBasis: ONE_UNIT_WIDTH,
  },
});


/**
 * Element representing single cell in grid structure. It only works when nested
 * inside Grid component.
 *
 * It only accepts size classes as arguments:
 * - if there are none provided it will fallback to auto
 * - if there is only `size` provided it will be same on all layouts
 * - otherwise it will choose smallest class defined that is applicable based
 *   on sizing of closest outer `Grid` element
 */
const Box = ({
  children,
  ...props
}, {
  containerSizeClass,
  contentDirection,
}) => {
  if (isHidden(containerSizeClass, props)) {
    return null;
  }

  const size = determineSize(containerSizeClass, props);
  const explicitSize = { [(contentDirection === 'vertical' ? 'width' : 'height')]: `${size}%` };

  const sizeStyle = (size === 'auto') ? style.autoSize : explicitSize;
  const directionStyle = { flexDirection: (contentDirection === 'vertical' ? 'column' : 'row') };

  return (
    <View style={[style.baseStyle, directionStyle, sizeStyle]}>
      {children}
    </View>
  );
};

Box.defaultProps = {
  children: null,
};

Box.contextTypes = {
  containerSizeClass: ContainerSizeProp,
  contentDirection: DirectionProp,
};

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  ...BoxProps,
};

export default Box;
