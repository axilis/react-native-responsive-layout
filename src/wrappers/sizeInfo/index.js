import React from 'react';
import PropTypes from 'prop-types';

import { SIZE_NAMES } from '../../shared/constants';
import { ContainerSizeProp } from '../../shared/props';
import { checkInsideGrid, warn } from '../../utils';
import { getSize } from './methods';


/**
 * Function as child component that provides:
 * - `size` - which corresponds to currently active size of grid
 * - `sizeSelector` - function which takes object that contains sizes as keys
 *  and returns closest size that is relevant, this enables style selection to
 *  match grid size
 */
export const SizeInfo = ({ children }, { containerSizeClass: size }) => {
  const sizeSelector = values => getSize(SIZE_NAMES, size, values);
  return children({
    size,
    sizeSelector
  });
};

SizeInfo.propTypes = {
  children: PropTypes.func.isRequired,
};

SizeInfo.contextTypes = {
  containerSizeClass: checkInsideGrid(ContainerSizeProp),
};

/**
 * Wraps provided component and provides:
 * - `size` - which corresponds to currently active size of grid
 * - `sizeSelector` - function which takes object that contains sizes as keys
 *  and returns closest size that is relevant, this enables style selection to
 *  match grid size
 *
 * @param { React.ComponentType<{size: string, sizeSelector: function(Object): *}> } Component
 */
export const withSizeInfo = (Component) => {
  const wrappedComponent = props => (
    <SizeInfo>
      {({ size, sizeSelector }) => (
        <Component
          size={size}
          sizeSelector={sizeSelector}
          {...props}
        />
      )}
    </SizeInfo>
  );

  const componentName = Component.displayName || Component.name || 'UnnamedComponent';
  wrappedComponent.displayName = `withSizeInfo(${componentName})`;

  return wrappedComponent;
};

export const withSizeClass = (Component) => {
  if (process.env.NODE_ENV === 'development') {
    warn(
      true,
      'We deprecated `withSizeClass` HOC and replaced it with `withSizeInfo`. You should either use the new HOC or equivalent `SizeInfo` FaCC.',
    );
  }
  return withSizeInfo(Component);
}
