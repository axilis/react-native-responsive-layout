import React from 'react';

import { SIZE_NAMES } from '../../shared/constants';
import { ContainerSizeProp } from '../../shared/props';
import { checkInsideGrid } from '../../utils';
import { getSize } from './methods';


/**
 * Wraps provided component and provides:
 * - `size` - which corresponds to currently active size of grid
 * - `sizeSelector` - function which takes object that contains sizes as keys
 *  and returns closest size that is relevant, this enables style selection to
 *  match grid size
 *
 * @param { React.ComponentType<{size: string, sizeSelector: function(Object): *}> } Component
 */
const withSizeClass = (Component) => {
  /** @type {React.StatelessComponent} */
  const WithSize = (props, { containerSizeClass }) => (
    <Component
      size={containerSizeClass}
      sizeSelector={values => getSize(SIZE_NAMES, containerSizeClass, values)}
      {...props}
    />
  );

  const componentName = Component.displayName || Component.name || 'UnnamedComponent';
  WithSize.displayName = `withSizeClass(${componentName})`;

  WithSize.contextTypes = {
    containerSizeClass: checkInsideGrid(ContainerSizeProp),
  };

  return WithSize;
};

export default withSizeClass;
