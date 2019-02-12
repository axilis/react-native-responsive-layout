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


// We need to ensure that stretch sizing wouldn't collapse to zero width when
// there is enough elements to already fill the line.
const ONE_UNIT_WIDTH = `${roundForPercentage(100 / GRID_UNITS)}%`;

const style = StyleSheet.create({
  stretchSize: {
    flex: 1,
    flexBasis: ONE_UNIT_WIDTH,
  },
});

/* eslint-disable */
/**
 * Element representing single cell in grid structure. It only works when nested
 * inside Grid component.
 *
 * It only accepts size classes as arguments:
 * - if there are none provided it will fallback to full width
 * - if there is only `size` provided it will be same on all layouts
 * - otherwise it will choose smallest class defined that is applicable based
 *   on sizing of closest outer `Grid` element
 *
 * @type {React.StatelessComponent<{size?: string | number, hidden?: boolean, visible?: boolean, style?: any, children: any}>}
 */
/* eslint-enable */
const Block = ({
  children,
  ...props
}, {
  gridSizeClass,
  gridContentDirection,
}) => {
  if (isHidden(SIZE_NAMES, gridSizeClass, props)) {
    return null;
  }

  // Which attribute we set depends on direction
  const styleProperty = gridContentDirection === VERTICAL ? 'width' : 'height';

  // Determine size
  const size = determineSize(SIZE_NAMES, gridSizeClass, props);
  const constantSize = { [styleProperty]: size };
  const sizeStyle = (size === 'stretch') ? style.stretchSize : constantSize;

  // flexDirection depends on direction
  const directionStyle = {
    flexDirection: (gridContentDirection === VERTICAL ? 'column' : 'row'),
  };

  return (
    <View style={[directionStyle, sizeStyle, props.style]}>
      {children}
    </View>
  );
};

Block.defaultProps = {
  children: null,
};

Block.contextTypes = {
  gridSizeClass: checkInsideGrid(ContainerSizeProp),
  gridContentDirection: checkInsideGrid(DirectionProp),
};

Block.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  ...BlockProps,
};

export default Block;
