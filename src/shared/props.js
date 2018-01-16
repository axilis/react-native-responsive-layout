import PropTypes from 'prop-types';

import {
  SIZE_NAMES,
  HORIZONTAL,
  VERTICAL,
} from './constants';


/**
 * Direction validator.
 */
export const DirectionProp = PropTypes.oneOf([HORIZONTAL, VERTICAL]).isRequired;

/**
 * Container size validator.
 */
export const ContainerSizeProp = PropTypes.oneOf(SIZE_NAMES).isRequired;
