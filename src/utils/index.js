import PropTypes from 'prop-types';

import { roundForPercentage } from '../shared/methods';


/**
 * Calculates element size to ensure that elements are proportionally stretched
 * so maximum amount of elements fits total size and size never goes below
 * minimal element size.
 *
 * @param {number} totalLength total length of available space
 * @param {number} minimalElementLength minimal length of single element
 * @returns {number}
 */
export const calculateStretchLength = (totalLength, minimalElementLength) => {
  const w = (100 / (Math.floor(totalLength / minimalElementLength) || 1));
  return (roundForPercentage(w) / 100) * totalLength;
};


/**
 * Logs warning to the console and displays yellow-box message.
 *
 * @param {boolean} shouldWarn
 * @param {string} message
 */
export const warn = (shouldWarn, message) => {
  if (shouldWarn) {
    console.warn(message); // eslint-disable-line no-console
  }
};


/**
 * Validates that specified prop exits. This is used to ensure that components
 * are rendered inside grid, by validating that they have expected context
 * props available.
 *
 * @param {any} ProvidedProp validation to run in case prop exists
 * @returns {function(Object, string, string): any}
 */
export const checkInsideGrid = ProvidedProp => (props, propName, componentName) => {
  const prop = props[propName];

  if (typeof prop === 'undefined') {
    return new Error(`Component \`${componentName}\` is rendered outside of \`Grid\`.`);
  }

  return PropTypes.checkPropTypes(
    { [propName]: ProvidedProp },
    { [propName]: prop },
    propName,
    componentName,
  );
};
