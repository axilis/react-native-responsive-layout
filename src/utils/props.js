import PropTypes from 'prop-types';

const checkInsideGrid = ProvidedProp => (props, propName, componentName) => {
  const prop = props[propName];

  if (typeof prop === 'undefined') {
    return new Error(
      `Component \`${componentName}\` is rendered outside of \`Grid\`.`,
    );
  }

  return PropTypes.checkPropTypes(
    { [propName]: ProvidedProp },
    { [propName]: prop },
    propName,
    componentName,
  );
};

export default checkInsideGrid;
