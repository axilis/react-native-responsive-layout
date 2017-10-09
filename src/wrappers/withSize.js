import React from 'react';
import PropTypes from 'prop-types';
import { BREAKPOINTS } from '../shared';
import { ContainerSizeProp } from '../shared/props';

export const determineOrientation = (width, height) => {
  return (
    (width <= height) ? 'PORTRAIT' : 'LANDSCAPE'
  );
};

export const getSize = (sizeClass, props, sizes = BREAKPOINTS) => {
  let relevantData = props[sizes[0]] || null;

  for (let i = 0; i < sizes.length; i += 1) {
    const size = sizes[i];

    // Ensure that key is updated on each size that is before.
    if (Object.prototype.hasOwnProperty.call(props, size)) {
      relevantData = props[size];
    }

    // If matched current size, early return to stop further iteration.
    if (sizeClass === size) {
      return relevantData;
    }
  }

  return relevantData;
};

/**
 * Wraps provided component and provides `size` which corresponds to relevant
 * sizing class and `orientation` props which will be inferred from closest
 * parent `Grid` element.
 *
 * @param { React.Component|function } Component
 */
const withSize = (Component) => {
  const wrapper = (props, context) => (
    <Component
      size={context.containerSizeClass}
      sizeSelector={(values) => getSize(context.containerSizeClass, values)}
      orientation={determineOrientation(context.referenceWidth, context.referenceHeight)}
      {...props}
    />
  );

  wrapper.contextTypes = {
    containerSizeClass: ContainerSizeProp,
    referenceWidth: PropTypes.number.isRequired,
    referenceHeight: PropTypes.number.isRequired,
  };

  wrapper.displayName = `withSize(${Component.displayName || Component.name}`;
  return wrapper;
};

export default withSize;
