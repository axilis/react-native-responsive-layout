import { isHidden, determineSize } from './methods';

const SIZE_CLASSES = ['xs', 'sm', 'md', 'xl'];

describe('isHidden', () => {
  it('returns false when nothing is defined', () => {
    expect(isHidden('md', { }, [])).toBeFalsy();
  });

  it('returns true when hidden', () => {
    expect(isHidden('md', { mdHidden: true }, SIZE_CLASSES)).toBeTruthy();
  });

  it('returns true when using common hidden attribute', () => {
    expect(isHidden('md', { hidden: true }, SIZE_CLASSES)).toBeTruthy();
  });

  it('returns false when explicitly overridden', () => {
    expect(
      isHidden('md', { hidden: true, mdHidden: false }, SIZE_CLASSES),
    ).toBeFalsy();
  });

  it('cascades from smaller to larger size', () => {
    expect(isHidden('md', { smHidden: true }, SIZE_CLASSES)).toBeTruthy();
  });

  it('respects overriding cascading sizes', () => {
    expect(
      isHidden('md', { xsHidden: true, smHidden: false }, SIZE_CLASSES),
    ).toBeFalsy();
  });

  it('ignores overrides that do not apply', () => {
    expect(isHidden('md', { smHidden: false, xlHidden: true }, SIZE_CLASSES)).toBeFalsy();
  });
});

describe('determineSize', () => {
  it('returns full width when nothing is defined', () => {
    expect(determineSize('sm', {})).toBeCloseTo(100);
  });

  it('returns provided size based on sizing class', () => {
    expect(determineSize('sm', { smSize: '1/2' }, SIZE_CLASSES)).toBeCloseTo(50);
  });

  it('returns common size unless overridden', () => {
    expect(determineSize('sm', { size: '1/3' }, SIZE_CLASSES)).toBeCloseTo(33.33);
  });

  it('returns provided value when overriding common size', () => {
    expect(determineSize('sm', { size: '1/3', smSize: '1/2' }, SIZE_CLASSES)).toBeCloseTo(50);
  });

  it('cascades from smaller to larger size', () => {
    expect(determineSize('md', { smSize: '1/2' }, SIZE_CLASSES)).toBeCloseTo(50);
  });

  it('respects overriding cascading sizes', () => {
    expect(determineSize('md', { smSize: '1/2', mdSize: '1/3' }, SIZE_CLASSES)).toBeCloseTo(33.33);
  });

  it('ignores overrides that do not apply', () => {
    expect(determineSize('md', { mdSize: '1/2', xlSize: '1/3' }, SIZE_CLASSES)).toBeCloseTo(50);
  });

  it('returns auto rather than size when it is selectd', () => {
    expect(determineSize('md', { mdSize: 'auto' }, SIZE_CLASSES)).toEqual('auto');
  })
});
