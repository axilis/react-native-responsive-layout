import { roundForPercentage } from './methods';


/**
 * Grid direction horizontal.
 */
export const HORIZONTAL = 'horizontal';

/**
 * Grid direction vertical.
 */
export const VERTICAL = 'vertical';


/**
 * Number of columns grid uses.
 */
export const GRID_UNITS = 12;


/**
 * Pairs on what are grid size prefixes and their respective minimum widths.
 * Ordered from the smallest to the largest. It fallbacks to the first one.
 */
const BREAKPOINTS = [
  {
    name: 'xs',
    size: 320,
  },
  {
    name: 'sm',
    size: 411,
  },
  {
    name: 'md',
    size: 568,
  },
  {
    name: 'lg',
    size: 768,
  },
  {
    name: 'xl',
    size: 1024,
  },
  {
    name: 'xxl',
    size: 1280,
  },
];

/**
 * Ordered list of breakpoint size names from smaller to larger.
 */
export const SIZE_NAMES = BREAKPOINTS.map(bp => bp.name);

/**
 * Map of values for given breakpoint size.
 */
export const BREAKPOINT_VALUES = BREAKPOINTS.reduce(
  (previous, bp) => ({ ...previous, [bp.name]: bp.size }),
  {},
);


/**
 * List of valid fractions.
 */
export const FRACTION_NAMES = (() => {
  const fractions = ['1'];
  for (let i = 1; i <= GRID_UNITS; i += 1) {
    for (let j = i; j <= GRID_UNITS; j += 1) {
      fractions.push(`${i}/${j}`);
    }
  }
  return fractions;
})();

/**
 * Generated table of width percentages for fractions.
 */
export const FRACTION_VALUES = (() => {
  const table = { 1: 100 };
  for (let i = 1; i <= GRID_UNITS; i += 1) {
    for (let j = 1; j <= i; j += 1) {
      table[`${j}/${i}`] = roundForPercentage((j / i) * 100.0);
    }
  }
  return table;
})();
