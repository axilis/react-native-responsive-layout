import { determineSizeClass } from './methods';

describe('determineSizeClass', () => {
  const BREAKPOINTS = {
    xs: 100,
    sm: 200,
    md: 300,
    xl: 400,
  };

  it('returns smallest size when nothing is provided', () => {
    expect(determineSizeClass(BREAKPOINTS)).toEqual('xs');
  });

  it('returns appropriate size class', () => {
    expect(determineSizeClass(BREAKPOINTS, 250)).toEqual('sm');
  });

  it('skips missing breakpoints', () => {
    expect(determineSizeClass({ md: 100, xxl: 200 }, 180)).toEqual('md');
    expect(determineSizeClass({ md: 100, xxl: 200 }, 280)).toEqual('xxl');
  });

  it('fallbacks to smallest size', () => {
    expect(determineSizeClass({ md: 100, xxl: 200 }, 80)).toEqual('xs');
  });
});
