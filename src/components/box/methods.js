import { BREAKPOINTS, GRID_UNITS, roundPercentage } from '../../shared';

/**
 * Generated list of valid fractions that can be used in components.
 */
const VALID_FRACTIONS = (() => {
  const fractions = ['1'];
  for (let i = 1; i <= GRID_UNITS; i += 1) {
    for (let j = i; j <= GRID_UNITS; j += 1) {
      fractions.push(`${i}/${j}`);
    }
  }
  return fractions;
})();


/**
 * Generated table of width percentages when using fractions.
 */
const FIXED_SIZES = (() => {
  const table = { 1: 100 };
  for (let i = 1; i <= GRID_UNITS; i += 1) {
    for (let j = 1; j <= i; j += 1) {
      table[`${j}/${i}`] = roundPercentage((j / i) * 100.0);
    }
  }
  return table;
})();


/**
 * Checks whether provided value is considered fraction.
 * @param {String} value to check
 * @return {Boolean}
 */
export const isFraction = value => (VALID_FRACTIONS.indexOf(value) !== -1);

/**
 * Checks whether provided number is within valid percentage range.
 * @param {Number} value to check
 * @return {Boolean}
 */
export const withinRange = value => (value >= 0 && value <= 100);


/**
 * Determines whether object is hidden depending on current sizing class.
 *
 * Since attributes cascade from smaller to larger dimensions and support
 * generic value, it will determine which one to use as reference and return
 * it's value.
 *
 * @param {String} sizeClass sizing class that is determined by grid
 * @param {Object} props object use as reference for values
 * @param {Array<String>} sizes that grid supports sorted from smaller to larger
 * @return {Boolean}
 */
export const isHidden = (sizeClass, props, sizes = BREAKPOINTS) => {
  let hidden = !!(props.hidden);

  for (let i = 0; i < sizes.length; i += 1) {
    const size = sizes[i];
    const key = `${size}Hidden`;

    // Ensure that key is updated on each size that is before.
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      hidden = props[key];
    }

    // If matched current size, early return to stop further iteration.
    if (sizeClass === size) {
      return hidden;
    }
  }

  return hidden;
};


/**
 * Determines size of component depended on sizing class.
 *
 * Since attributes cascade from smaller to larger dimensions and support
 * generic value, it will determine which one to use as reference and return
 * it's value.
 *
 * @param {String} sizeClass sizing class that is determined by grid
 * @param {Object} props object use as reference for values
 * @param {Array<String>} sizes that grid supports sorted from smaller to larger
 * @return {String}
 */
const getSize = (sizeClass, props, sizes) => {
  let relevantSize = props.size || '1';

  for (let i = 0; i < sizes.length; i += 1) {
    const size = sizes[i];
    const key = `${size}Size`;

    // Ensure that key is updated on each size that is before.
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      relevantSize = props[key];
    }

    // If matched current size, early return to stop further iteration.
    if (sizeClass === size) {
      return relevantSize;
    }
  }

  return relevantSize;
};


/**
 * Determines width percentage of component depended on sizing class.
 *
 * Since attributes cascade from smaller to larger dimensions and support
 * generic value, it will determine which one to use as reference and return
 * it's value.
 *
 * @param {String} sizeClass sizing class that is determined by grid
 * @param {Object} props object use as reference for values
 * @param {Array<String>} sizes classes that grid supports sorted by size
 * @return {Number}
 */
export const determineSize = (sizeClass, props, sizes = BREAKPOINTS) => {
  const size = getSize(sizeClass, props, sizes);

  if (size === 'auto') {
    return size;
  }

  if ((typeof size) === 'string') {
    // Fallback to full width.
    return FIXED_SIZES[size];
  }
  return size;
};

