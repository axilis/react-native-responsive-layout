import { valueForSize } from '../../shared/methods';


/**
 * Selects value from props that closest matches sizeClass starting from
 * smallest to largest.
 */
export const getSize = (sizeNames, activeSize, props) => {
  const initialValue = (props[sizeNames[0]] || undefined);
  const keySelector = key => key;

  return valueForSize(sizeNames, activeSize, props, initialValue, keySelector);
};
