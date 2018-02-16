import React from 'react';

import { SIZE_NAMES } from '../../shared/constants';
import { ContainerSizeProp } from '../../shared/props';
import { checkInsideGrid } from '../../utils';
import { getSize } from './methods';


/**
 * Function as a child component that provides:
 * - `size` - which corresponds to currently active size of grid
 * - `sizeSelector` - function which takes object that contains sizes as keys
 *  and returns closest size that is relevant, this enables style selection to
 *  match grid size
 */
const WithSizeClass = ({ children }, { containerSizeClass }) => {
  const sizeSelector = values => getSize(SIZE_NAMES, containerSizeClass, values);
  return children(containerSizeClass, sizeSelector);
};

WithSizeClass.contextTypes = {
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
export const withSizeClass = (Component) => {
  const wrappedComponent = props => (
    <WithSizeClass>
      {(size, sizeSelector) => (
        <Component
          size={size}
          sizeSelector={sizeSelector}
          {...props}
        />)}
    </WithSizeClass>);

  const componentName = Component.displayName || Component.name || 'UnnamedComponent';
  wrappedComponent.displayName = `withSizeClass(${componentName})`;

  return wrappedComponent;
};


export default withSizeClass;
