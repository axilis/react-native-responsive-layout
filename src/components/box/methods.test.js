import { isHidden, determineSize } from './methods';

describe('isHidden', () => {
  const SIZE_CLASSES = ['xs', 'sm', 'md', 'xl'];

  it('defaults to false', () => {
    expect(isHidden('md', { }, [])).toBeFalsy();
  });

  it('returns true when hidden', () => {
    expect(isHidden('md', { mdHidden: true }, SIZE_CLASSES)).toBeTruthy();
  });

  it('supports using common hidden attribute', () => {
    expect(isHidden('md', { hidden: true }, SIZE_CLASSES)).toBeTruthy();
  });

  it('respects explicitly overriding common value', () => {
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

  it('ignores overrides that do not apply to it', () => {
    expect(isHidden('md', { smHidden: false, xlHidden: true }, SIZE_CLASSES)).toBeFalsy();
  });
});


describe('determineSize', () => {
  const SIZE_CLASSES = ['xs', 'sm', 'md', 'xl'];

  it('returns full width when nothing is defined', () => {
    expect(determineSize('sm', {})).toBeCloseTo(100);
  });

  it('returns expected size based on sizing class', () => {
    expect(determineSize('sm', { smSize: '1/2' }, SIZE_CLASSES)).toBeCloseTo(50);
  });

  it('supports using percentages', () => {
    expect(determineSize('sm', { smSize: 20 })).toEqual(20);
  });

  it('supports common size', () => {
    expect(determineSize('sm', { size: '1/3' }, SIZE_CLASSES)).toBeCloseTo(33.33);
  });

  it('supports overriding common size', () => {
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

  it('supports using auto as value', () => {
    expect(determineSize('md', { mdSize: 'auto' }, SIZE_CLASSES)).toEqual('auto');
  });

  it('fallbacks to full width for unknown sizes', () => {
    expect(determineSize('xxl', {}, SIZE_CLASSES)).toEqual(100);
  });
});
