import { determineSizeClass } from './methods';


describe('determineSizeClass', () => {
  const sizeNames = ['xs', 'sm', 'md', 'xl', 'xxl'];

  it('returns smallest size when nothing is provided', () => {
    const breakpointValues = {
      xs: 100, sm: 200, md: 300, xl: 400,
    };
    expect(determineSizeClass(sizeNames, breakpointValues)).toEqual('xs');
  });

  it('returns appropriate size class', () => {
    const sizes = ['xs', 'sm', 'md', 'xl'];
    const breakpointValues = { sm: 200, md: 300, xl: 400 };
    expect(determineSizeClass(sizes, breakpointValues, 50)).toEqual('xs');
    expect(determineSizeClass(sizes, breakpointValues, 200)).toEqual('sm');
    expect(determineSizeClass(sizes, breakpointValues, 250)).toEqual('sm');
    expect(determineSizeClass(sizes, breakpointValues, 300)).toEqual('md');
    expect(determineSizeClass(sizes, breakpointValues, 350)).toEqual('md');
    expect(determineSizeClass(sizes, breakpointValues, 400)).toEqual('xl');
    expect(determineSizeClass(sizes, breakpointValues, 450)).toEqual('xl');
  });

  it('skips missing breakpointValues', () => {
    const breakpointValues = { md: 100, xxl: 200 };
    expect(determineSizeClass(sizeNames, breakpointValues)).toEqual('xs');
    expect(determineSizeClass(sizeNames, breakpointValues, 150)).toEqual('md');
    expect(determineSizeClass(sizeNames, breakpointValues, 280)).toEqual('xxl');
  });

  it('fallbacks to smallest size', () => {
    const breakpointValues = { md: 100, xxl: 200 };
    expect(determineSizeClass(sizeNames, breakpointValues, 80)).toEqual('xs');
  });
});
