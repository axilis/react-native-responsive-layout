import { BREAKPOINTS, DEFAULT_SIZES } from '../../shared';

export const mergeBreakpoints = (breakpoints) => {
  Object.keys(breakpoints).forEach((key) => {
    if (!BREAKPOINTS.contains(key)) {
      console.warn(`Unknown breakpoint size "${key}"`);
    }
  });

  return {
    ...DEFAULT_SIZES,
    ...breakpoints,
  };
};

// Order is important
export const determineSizeClass = (breakpoints, size = 0) => {
  const lastIndex = BREAKPOINTS.length - 1;
  let gridSizeClass = BREAKPOINTS[lastIndex];

  for (let i = lastIndex; i >= 0; i -= 1) {
    const sizeClass = BREAKPOINTS[i];
    const breakpointSize = breakpoints[sizeClass];

    if (breakpointSize < size) {
      return sizeClass;
    }

    gridSizeClass = sizeClass;
  }

  return gridSizeClass;
};
