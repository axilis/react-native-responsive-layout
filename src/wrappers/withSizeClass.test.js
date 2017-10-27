import { determineOrientation, getSize } from './withSizeClass';

describe('determineOrientation', () => {
  it('returns landscape when width is larger than height', () => {
    expect(determineOrientation(100, 50)).toEqual('LANDSCAPE');
  });

  it('returns portrait when width is larger equal to height', () => {
    expect(determineOrientation(100, 100)).toEqual('PORTRAIT');
  });

  it('returns portrait when width is smaller than height', () => {
    expect(determineOrientation(50, 100)).toEqual('PORTRAIT');
  });
});


describe('getSize', () => {
  const SIZE_CLASSES = ['xs', 'sm', 'md', 'xl'];

  it('returns null when there is no defined value', () => {
    expect(getSize('sm', {})).toBeUndefined();
  });

  it('returns provided size object based on sizing class', () => {
    expect(getSize('sm', { sm: 'EXP' }, SIZE_CLASSES)).toEqual('EXP');
  });

  it('cascades from smaller to larger size', () => {
    expect(getSize('md', { sm: 'EXP' }, SIZE_CLASSES)).toEqual('EXP');
  });

  it('respects overriding cascading sizes', () => {
    expect(getSize('md', { sm: 'NON', md: 'EXP' }, SIZE_CLASSES)).toEqual('EXP');
  });

  it('ignores overrides that do not apply', () => {
    expect(getSize('md', { md: 'EXP', xl: 'NON' }, SIZE_CLASSES)).toEqual('EXP');
  });
});
