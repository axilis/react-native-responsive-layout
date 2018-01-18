import { determineSize, isHidden } from './methods';


describe('isHidden', () => {
  const sizeNames = ['xs', 'sm', 'md', 'xl'];

  it('defaults to false', () => {
    expect(isHidden([], 'md', { })).toBeFalsy();
  });

  it('returns true when hidden', () => {
    expect(isHidden(sizeNames, 'md', { mdHidden: true })).toBeTruthy();
  });

  it('supports using common hidden attribute', () => {
    expect(isHidden(sizeNames, 'md', { hidden: true })).toBeTruthy();
  });

  it('respects explicitly overriding common value', () => {
    expect(isHidden(sizeNames, 'md', { hidden: true, mdHidden: false })).toBeFalsy();
  });

  it('cascades from smaller to larger size', () => {
    expect(isHidden(sizeNames, 'md', { smHidden: true })).toBeTruthy();
  });

  it('respects overriding cascading sizes', () => {
    expect(isHidden(sizeNames, 'md', { xsHidden: true, smHidden: false })).toBeFalsy();
  });

  it('ignores overrides that do not apply to it', () => {
    expect(isHidden(sizeNames, 'md', { smHidden: false, xlHidden: true })).toBeFalsy();
  });
});


describe('determineSize', () => {
  const sizeNames = ['xs', 'sm', 'md', 'xl'];

  it('returns full width when nothing is defined', () => {
    expect(determineSize(sizeNames, 'sm', {})).toEqual('100%');
  });

  it('returns expected size based on sizing class', () => {
    expect(determineSize(sizeNames, 'sm', { smSize: '1/2' })).toEqual('50%');
  });

  it('returns full width when there is no class matching', () => {
    expect(determineSize(sizeNames, 'sm', { mdSize: '1/2' })).toEqual('100%');
  });

  it('supports using fixed values', () => {
    expect(determineSize(sizeNames, 'sm', { smSize: 20 })).toEqual(20);
  });

  it('supports using percentages', () => {
    expect(determineSize(sizeNames, 'sm', { smSize: '10%' })).toEqual('10%');
  });

  it('supports common size', () => {
    expect(determineSize(sizeNames, 'sm', { size: '1/3' })).toEqual('33.3333%');
  });

  it('supports overriding common size', () => {
    expect(determineSize(sizeNames, 'sm', { size: '1/3', smSize: '1/2' })).toEqual('50%');
  });

  it('cascades from smaller to larger size', () => {
    expect(determineSize(sizeNames, 'md', { smSize: '1/2' })).toEqual('50%');
  });

  it('respects overriding cascading sizes', () => {
    expect(determineSize(sizeNames, 'md', { smSize: '1/2', mdSize: '1/3' })).toEqual('33.3333%');
  });

  it('ignores overrides that do not apply', () => {
    expect(determineSize(sizeNames, 'md', { mdSize: '1/2', xlSize: '1/3' })).toEqual('50%');
  });

  it('supports using stretch as value', () => {
    expect(determineSize(sizeNames, 'md', { mdSize: 'stretch' })).toEqual('stretch');
  });

  it('fallbacks to full width for unknown sizes', () => {
    expect(determineSize(sizeNames, 'xxl', {})).toEqual('100%');
  });
});
