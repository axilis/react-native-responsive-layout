import { getSize } from './methods';


describe('getSize', () => {
  const sizeNames = ['xs', 'sm', 'md', 'xl'];

  it('returns null when there is no defined value', () => {
    expect(getSize(sizeNames, 'sm', {})).toBeUndefined();
  });

  it('returns provided size object based on sizing class', () => {
    expect(getSize(sizeNames, 'sm', { sm: 'EXP' })).toEqual('EXP');
  });

  it('cascades from smaller to larger size', () => {
    expect(getSize(sizeNames, 'md', { sm: 'EXP' })).toEqual('EXP');
  });

  it('respects overriding cascading sizes', () => {
    expect(getSize(sizeNames, 'md', { sm: 'NON', md: 'EXP' })).toEqual('EXP');
  });

  it('ignores overrides that do not apply', () => {
    expect(getSize(sizeNames, 'md', { md: 'EXP', xl: 'NON' })).toEqual('EXP');
  });

  it('fallbacks to the smallest value', () => {
    expect(getSize(sizeNames, 'sm', { default: 'EXP' })).toEqual('EXP');
  });
});
