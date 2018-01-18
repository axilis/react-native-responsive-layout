import PropTypes from 'prop-types';

import {
  FRACTION_NAMES,
  SIZE_NAMES,
} from '../../shared/constants';

/**
 * Checks whether provided value is valid fraction.
 *
 * @param {String} value to check
 * @return {Boolean} true if it is fraction
 */
const isFraction = value => (FRACTION_NAMES.indexOf(value) !== -1);

/**
 * Regex used to validate percentages, this way it is reused.
 */
const percentageMatcher = /^\d+(\.\d+)?%$/;

/**
 * Checks whether provided string is valid percentage.
 *
 * @param {String} value  to check
 * @return {Boolean} true if it is percentage
 */
const isPercentage = value => percentageMatcher.test(value);


/**
 * PropType that validates grid element size to be either string fraction or
 * numerical percentage.
 */
export const SizeProp = (props, propName) => {
  const size = props[propName];

  if (typeof size === 'string') {
    if (isFraction(size) || isPercentage(size) || size === 'stretch') {
      return undefined;
    }
    return new Error(
      `'${propName}' string argument should be valid fraction, percentage or stretch. \nGot: "${size}"`,
    );
  }

  if (typeof size === 'number') {
    if (size >= 0) {
      return undefined;
    }
    return new Error(
      `${propName} should be positive number. \nGot: ${size}%.`,
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
  SIZE_NAMES.forEach((size) => {
    props[`${size}Size`] = SizeProp;
  });
  return props;
})();


/**
 * Defines hidden attribute prop validations for all sizes.
 */
const HiddenProps = (() => {
  const props = { hidden: PropTypes.bool };
  SIZE_NAMES.forEach((size) => {
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
