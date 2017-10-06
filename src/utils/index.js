import { roundPercentage } from '../shared';

/**
 * Calculates element size to ensure that elements are proportionally stretched
 * so maximum amount of elements fits total size and size never goes below
 * minimal element size.
 *
 * @param {number} totalLength total length of available space
 * @param {number} minimalElementLength minimal length of single element
 */
export const calculateStretchLength = (totalLength, minimalElementLength) => {
  const w = (100 / Math.floor(totalLength / minimalElementLength));
  return roundPercentage(w);
};

