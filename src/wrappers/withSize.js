import React from 'react';
import PropTypes from 'prop-types';
import { ContainerSizeProp } from '../shared/props';

export const determineOrientation = (width, height) => {
  return (
    (width <= height) ? 'PORTRAIT' : 'LANDSCAPE'
  );
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
      orientation={determineOrientation(context.referenceWidth, context.referenceHeight)}
      {...props}
    />
  );

  wrapper.contextTypes = {
    containerSizeClass: ContainerSizeProp,
    referenceWidth: PropTypes.number.isRequired,
    referenceHeight: PropTypes.number.isRequired,
  };

  return wrapper;
};

export default withSize;
