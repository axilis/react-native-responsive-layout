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
 * @param {Array<String>} sizeNames that grid supports ordered from smallest
 * @param {String} activeSize that is determined by grid
 * @param {Object} props object use as reference for values
 * @return {Boolean}
 */
export const isHidden = (sizeNames, activeSize, props) => {
  const initialValue = !!(props.hidden);
  const keySelector = size => `${size}Hidden`;

  return valueForSize(sizeNames, activeSize, props, initialValue, keySelector);
};


/**
 * Determines size of component depended on sizing class.
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
 * @param {Array<String>} sizeNames that grid supports ordered from smallest
 * @param {String} activeSize that is determined by grid
 * @param {Object} props object use as reference for values
 * @return {Number} representing width/height as percentage
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

