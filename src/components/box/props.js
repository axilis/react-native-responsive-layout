import PropTypes from 'prop-types';

import { BREAKPOINTS } from '../../shared';
import { isFraction, withinRange } from './methods';

/**
 * PropType that validates grid element size to be fraction or percentage.
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
};


/**
 * Defines size attribute prop validation for all sizes.
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
 * All prop types that are required for Box element.
 */
const BoxProps = {
  ...BreakpointProps,
  ...HiddenProps,
};

export default BoxProps;
