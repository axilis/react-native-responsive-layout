import { BREAKPOINTS } from '../../shared';

/**
 * Determines size class from provided breakpoints and element size.
 */
export const determineSizeClass = (breakpoints, size = 0) => {
  const lastIndex = BREAKPOINTS.length - 1;
  let gridSizeClass = BREAKPOINTS[lastIndex];

  for (let i = lastIndex; i >= 0; i -= 1) {
    const sizeClass = BREAKPOINTS[i];
    const breakpointSize = breakpoints[sizeClass];

    if (breakpointSize !== undefined && breakpointSize < size) {
      return sizeClass;
    }

    gridSizeClass = sizeClass;
  }

  return gridSizeClass;
};
