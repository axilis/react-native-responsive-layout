import PropTypes from 'prop-types';

import {
  FRACTION_NAMES,
  SIZE_NAMES,
} from '../../shared/constants';

/**
 * Checks whether provided value is valid fraction.
 *
 * @param {string} value to check
 * @return {boolean} true if it is fraction
 */
const isFraction = value => (FRACTION_NAMES.indexOf(value) !== -1);

/**
 * Regex used to validate percentages, this way it is reused.
 */
const percentageMatcher = /^\d+(\.\d+)?%$/;

/**
 * Checks whether provided string is valid percentage.
 *
 * @param {string} value  to check
 * @return {boolean} true if it is percentage
 */
const isPercentage = value => percentageMatcher.test(value);


/**
 * PropType that validates grid element size to be either string fraction or
 * numerical percentage.
 *
 * @param {Object} props
 * @param {string} propName
 * @return {Error | undefined}
 */
export const SizeProp = (props, propName) => {
  const size = props[propName];

  if (typeof size === 'string') {
    if (isFraction(size) || isPercentage(size) || size === 'stretch') {
      return undefined;
    }
    return new Error(`'${propName}' string argument should be valid fraction, percentage or stretch. \nGot: "${size}"`);
  }

  if (typeof size === 'number') {
    if (size >= 0) {
      return undefined;
    }
    return new Error(`${propName} should be positive number. \nGot: ${size}%.`);
  }

  if (size !== undefined) {
    return new Error(`${propName} should be either string fraction or numerical percentage. \nGot: ${size}`);
  }

  return undefined;
};


/**
 * PropType that validates hidden/visible elements and their exclusivity.
 *
 * @param {string=} sizeName
 * @return {function(Object, string): Error | undefined}
 */
export const HiddenProp = sizeName => (props, propName) => {
  const visibleKey = sizeName ? `${sizeName}Visible` : 'visible';
  const hiddenKey = sizeName ? `${sizeName}Hidden` : 'hidden';

  if (props[visibleKey] && props[hiddenKey]) {
    return new Error(`'${propName}' has also defined ${visibleKey} prop, this leads to unexpected behavior.`);
  }

  const size = props[propName];

  if (size !== undefined && typeof size !== 'boolean') {
    return new Error(`'${propName}' should be boolean. \nGot: "${size}"`);
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
  // Defining only hidden will ensure that if both are defined proper message
  // is displayed, if it was defined on both it would display same error twice.
  const props = {
    hidden: HiddenProp(),
    visible: PropTypes.bool,
  };

  SIZE_NAMES.forEach((size) => {
    props[`${size}Hidden`] = HiddenProp(size);
    props[`${size}Visible`] = PropTypes.bool;
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
