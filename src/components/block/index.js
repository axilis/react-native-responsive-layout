import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import {
  SIZE_NAMES,
  GRID_UNITS,
  VERTICAL,
} from '../../shared/constants';

import { roundForPercentage } from '../../shared/methods';
import { ContainerSizeProp, DirectionProp } from '../../shared/props';
import { checkInsideGrid } from '../../utils';
import { determineSize, isHidden } from './methods';
import BlockProps from './props';


// We need to ensure that auto sizing wouldn't collapse to zero width when there
// is enough elements to already fill the line.
const ONE_UNIT_WIDTH = `${roundForPercentage(100 / GRID_UNITS)}%`;

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
 * - if there are none provided it will fallback to full width
 * - if there is only `size` provided it will be same on all layouts
 * - otherwise it will choose smallest class defined that is applicable based
 *   on sizing of closest outer `Grid` element
 */
const Block = ({
  children,
  ...props
}, {
  containerSizeClass,
  contentDirection,
}) => {
  if (isHidden(SIZE_NAMES, containerSizeClass, props)) {
    return null;
  }

  // Generate with/height size style
  const size = determineSize(SIZE_NAMES, containerSizeClass, props);
  const styleProperty = contentDirection === VERTICAL ? 'width' : 'height';
  const constantSize = { [styleProperty]: `${size}%` };
  const sizeStyle = (size === 'auto') ? style.autoSize : constantSize;

  // Generate direction style
  const directionStyle = {
    flexDirection: (contentDirection === VERTICAL ? 'column' : 'row'),
  };

  return (
    <View style={[style.baseStyle, directionStyle, sizeStyle, props.style]}>
      {children}
    </View>
  );
};

Block.defaultProps = {
  children: null,
};

Block.contextTypes = {
  containerSizeClass: checkInsideGrid(ContainerSizeProp),
  contentDirection: checkInsideGrid(DirectionProp),
};

Block.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  ...BlockProps,
};

export default Block;
