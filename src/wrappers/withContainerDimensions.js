import React from 'react';
import PropTypes from 'prop-types';


/**
 * Wraps provided component and provides `width` and `height` which are used
 * to determine sizing class - depending on `Grid` configuration that will be
 * either be window sizes or `Grid` component size.
 *
 * @param { React.Component|function } Component
 */
const withContainerDimensions = (Component) => {
  const wrapper = (props, context) => (
    <Component
      width={context.referenceWidth}
      height={context.referenceHeight}
      {...props}
    />
  );

  wrapper.contextTypes = {
    referenceWidth: PropTypes.number.isRequired,
    referenceHeight: PropTypes.number.isRequired,
  };

  wrapper.displayName = `withContainerDimensions(${Component.displayName || Component.name})`;
  return wrapper;
};

export default withContainerDimensions;
