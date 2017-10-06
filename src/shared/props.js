import PropTypes from 'prop-types';
import { BREAKPOINTS } from './index';

export const DirectionProp = PropTypes.oneOf(['horizontal', 'vertical']).isRequired;
export const ContainerSizeProp = PropTypes.oneOf(BREAKPOINTS).isRequired;
