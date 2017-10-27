import PropTypes from 'prop-types';

import { BREAKPOINTS } from '../../shared';
import { VALID_FRACTIONS } from './methods';

/**
 * Checks whether provided value is considered fraction.
 *
 * @param {String} value to check
 * @return {Boolean}
 */
const isFraction = value => (VALID_FRACTIONS.indexOf(value) !== -1);

/**
 * Checks whether provided number is within valid percentage range.
 *
 * @param {Number} value to check
 * @return {Boolean}
 */
const withinRange = value => (value >= 0 && value <= 100);


/**
 * PropType that validates grid element size to be either string fraction or
 * numerical percentage.
 */
export const SizeProp = (props, propName) => {
  const size = props[propName];

  if (typeof size === 'string') {
    if (isFraction(size) || size === 'auto') {
      return undefined;
    }
    return new Error(
      `${propName} string argument should be valid fraction or auto. \nGot: "${size}."`,
    );
  }

  if (typeof size === 'number') {
    if (withinRange(size)) {
      return undefined;
    }
    return new Error(
      `${propName} should be within 0 and 100 percent. \nGot: ${size}%.`,
    );
  }

  if (size !== undefined) {
    return new Error(
      `${propName} should be either string fraction or numerical percentage. \nGot: ${size}`,
    );
  }

  return undefined;
};


/**
 * Defines prop validation for all sizes to be valid string or number.
 */
const BreakpointProps = (() => {
  const props = { size: SizeProp };
  BREAKPOINTS.forEach((size) => {
    props[`${size}Size`] = SizeProp;
  });
  return props;
})();


/**
 * Defines hidden attribute prop validations for all sizes.
 */
const HiddenProps = (() => {
  const props = { hidden: PropTypes.bool };
  BREAKPOINTS.forEach((size) => {
    props[`${size}Hidden`] = PropTypes.bool;
  });
  return props;
})();


/**
 * Merge of all prop validations that are required for Block element.
 */
const BlockProps = {
  ...BreakpointProps,
  ...HiddenProps,
};

export default BlockProps;
