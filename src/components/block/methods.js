import { FRACTION_VALUES } from '../../shared/constants';
import { valueForSize } from '../../shared/methods';


/**
 * Determines whether object is hidden depending on currently active size.
 *
 * Since attributes cascade from smaller to larger dimensions it will determine
 * which one to use and return it's value. This enables easy way to hide
 * elements from determined size up.
 *
 * For example `mdHidden={true}` will hide element on medium sized but as well
 * on all larger sizes unless overridden.
 *
 * @param {Array<string>} sizeNames that grid supports ordered from smallest
 * @param {string} activeSize that is determined by grid
 * @param {Object} props object use as reference for values
 * @return {boolean}
 */
export const isHidden = (sizeNames, activeSize, props) => {
  // Strictly check hidden and visible as default values
  let value = props.hidden === true || props.visible === false;

  for (let i = 0; i < sizeNames.length; i += 1) {
    const size = sizeNames[i];
    const keyVisible = `${size}Visible`;
    const keyHidden = `${size}Hidden`;

    // Mutual prop exclusivity is expected and validated using prop types.
    // Therefore we can here assume that in each iteration only one of following
    // will be executed.
    if (Object.prototype.hasOwnProperty.call(props, keyVisible)) {
      value = !props[keyVisible];
    }

    if (Object.prototype.hasOwnProperty.call(props, keyHidden)) {
      value = props[keyHidden];
    }

    // If matched current size, early return to stop further iteration.
    if (activeSize === size) {
      return value;
    }
  }

  return value;
};


/**
 * Determines size of component depended on sizing class.
 *
 * @param {Array<string>} sizeNames that grid supports ordered from smallest
 * @param {string} activeSize that is determined by grid
 * @param {Object} props object use as reference for values
 * @return {any}
 */
const getSize = (sizeNames, activeSize, props) => {
  const initialValue = (props.size || '1');
  const keySelector = size => `${size}Size`;

  return valueForSize(sizeNames, activeSize, props, initialValue, keySelector);
};


/**
 * Determines width percentage of component depended on currently active size.
 *
 * Since attributes cascade from smaller to larger dimensions it will determine
 * which one to use and return it's value. This enables easy way to determine
 * element size.
 *
 * For example `mdSize="1/2"` will return 50% on medium sized but as well
 * on all larger sizes, unless overridden with larger size.
 *
 * It returns full with if there is none matching current size (either none is
 * smaller or there were no provided).
 *
 * @param {Array<string>} sizeNames that grid supports ordered from smallest
 * @param {string} activeSize that is determined by grid
 * @param {Object} props object use as reference for values
 * @return {number | string} representing width/height as percentage
 */
export const determineSize = (sizeNames, activeSize, props) => {
  const size = getSize(sizeNames, activeSize, props);

  if (size === 'stretch') {
    return size;
  }

  if ((typeof size) === 'string') {
    // If string represents percentages
    if (size.endsWith('%')) {
      return size;
    }

    // If string represents fractions
    return `${FRACTION_VALUES[size]}%`;
  }

  return size;
};
