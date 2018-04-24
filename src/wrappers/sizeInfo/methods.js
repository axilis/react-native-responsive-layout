import { valueForSize } from '../../shared/methods';


/**
 * Selects value from props that closest matches sizeClass starting from
 * smallest to largest.
 *
 * @param {Array<string>} sizeNames array of grid sizes
 * @param {string} activeSize active grid size
 * @param {Object} props object containing values for sizes
 * @returns {any}
 */
export const getSize = (sizeNames, activeSize, props) => {
  const initialValue = (props[sizeNames[0]] || props.default || undefined);
  const keySelector = key => key;

  return valueForSize(sizeNames, activeSize, props, initialValue, keySelector);
};
