
const ROUNDING_FACTOR = 10000;

/**
 * Rounds down percent to ensure that total width won't exceed 100% fixing
 * issues with floating point representation of specific widths.
 *
 * @param {number} percent
 * @returns {number}
 */
export const roundForPercentage = percent => (
  Math.floor(percent * ROUNDING_FACTOR) / ROUNDING_FACTOR
);


/**
 * Utility method used to pick the largest value that is smaller than current
 * gird width. It is used to pick best fitting object from keys that would fit
 * as well.
 *
 * @param {Array<string>} sizeNames array of grid sizes
 * @param {string} activeSize active grid size
 * @param {Object} props object containing values for sizes
 * @param {any} initialValue default value if none matches
 * @param {function(string): string} keySelector function that generates key to access value
 * @returns {any}
 */
export const valueForSize = (sizeNames, activeSize, props, initialValue, keySelector) => {
  let value = initialValue;

  for (let i = 0; i < sizeNames.length; i += 1) {
    const size = sizeNames[i];
    const key = keySelector(size);

    // Ensure that key is updated on each size that is before.
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      value = props[key];
    }

    // If matched current size, early return to stop further iteration.
    if (activeSize === size) {
      return value;
    }
  }

  return value;
};
