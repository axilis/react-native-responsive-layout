import PropTypes from 'prop-types';

import { SIZE_NAMES } from '../../shared/constants';


/**
 * Validates that grid breakpoints must be numbers.
 */
export const BreakpointsProp = PropTypes.shape(SIZE_NAMES.reduce(
  (previous, size) => ({ ...previous, [size]: PropTypes.number }),
  {},
));
