import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import BoxProps from './props';
import { roundPercentage, GRID_UNITS } from '../../shared';
import { DirectionProp, ContainerSizeProp } from '../../shared/props';

import { determineSize, isHidden } from './methods';

const ONE_UNIT_WIDTH = `${roundPercentage(100 / GRID_UNITS)}%`;

const style = StyleSheet.create({
  baseStyle: {
    justifyContent: 'flex-start',
  },
  autoStyle: {
    flex: 1,
    flexBasis: ONE_UNIT_WIDTH,
  },
});


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
  const sizeStyle = (size === 'auto') ? style.autoStyle : { [(contentDirection === 'vertical' ? 'width' : 'height')]: `${size}%` };
  const directionStyle = {
    flexDirection: (contentDirection === 'vertical' ? 'column' : 'row'),
  };

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
