import PropTypes from 'prop-types';
import { BREAKPOINTS } from '../../shared';

export default (() => {
  const props = {};
  BREAKPOINTS.forEach((size) => {
    props[size] = PropTypes.number;
  });
  return PropTypes.shape(props);
})();
