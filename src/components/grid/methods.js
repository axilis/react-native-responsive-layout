
/**
 * Determines active size name from provided breakpoints and element size.
 *
 * @param {Array<string>} sizeNames that grid supports ordered from smallest
 * @param {Object} breakpointValues object containing values for sizes
 * @param {number} value width/height from which to determine active size
 * @return {string} largest size name that is still larger than value
 */
export const determineSizeClass = (sizeNames, breakpointValues, value) => {
  // Start from end to find largest one that is matching
  const lastIndex = sizeNames.length - 1;
  let preferredSizeClass = sizeNames[lastIndex];

  for (let i = lastIndex; i >= 0; i -= 1) {
    const sizeClass = sizeNames[i];
    const breakpointSize = breakpointValues[sizeClass];

    // If there is matching, early return
    if (breakpointSize !== undefined && breakpointSize <= value) {
      return sizeClass;
    }

    preferredSizeClass = sizeClass;
  }

  return preferredSizeClass;
};
