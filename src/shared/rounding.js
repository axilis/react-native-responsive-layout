
const ROUNDING_FACTOR = 10000;


/**
 * Rounds down percent to ensure that total width won't exceed 100% fixing
 * issues with floating point representation of specific widths.
 *
 * @param {number} percent
 */
export const roundPercentage = (percent) => {
  return Math.floor(percent * ROUNDING_FACTOR) / ROUNDING_FACTOR;
}
