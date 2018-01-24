import { GRID_UNITS } from '../../shared/constants';
import { SizeProp, HiddenProp } from './props';


describe('SizeProp', () => {
  describe('fractions', () => {
    it('allows whole number as a fraction', () => {
      expect(SizeProp({ size: '1' }, 'size')).toBeUndefined();
    });

    it('allows fractions up to twelfths', () => {
      for (let i = 1; i <= GRID_UNITS; i += 1) {
        for (let j = 1; j <= i; j += 1) {
          expect(SizeProp({ size: `${j}/${i}` }, 'size')).toBeUndefined();

          // Reduced fractions
          for (let k = 2; k <= j; k += 1) {
            if ((i % k === 0) && (j % k === 0)) {
              expect(SizeProp({ size: `${j / k}/${i / k}` }, 'size')).toBeUndefined();
            }
          }
        }
      }
    });

    it('expects a number', () => {
      expect(SizeProp({ size: '' }, 'size')).toBeInstanceOf(Error);
      expect(SizeProp({ size: 'a' }, 'size')).toBeInstanceOf(Error);
    });

    it('expects fractions not to be over 100%', () => {
      for (let i = 1; i < GRID_UNITS; i += 1) {
        for (let j = i + 1; j <= GRID_UNITS; j += 1) {
          expect(SizeProp({ size: `${j}/${i}` }, 'size')).toBeInstanceOf(Error);

          // Reducing fractions
          for (let k = 2; k <= j; k += 1) {
            if ((i % k === 0) && (j % k === 0)) {
              expect(SizeProp({ size: `${j / k}/${i / k}` }, 'size')).toBeInstanceOf(Error);
            }
          }
        }
      }
    });
  });

  describe('fixed widths', () => {
    it('allows positive number', () => {
      expect(SizeProp({ size: 10 }, 'size')).toBeUndefined();
    });

    it('expects positive number', () => {
      expect(SizeProp({ size: -2 }, 'size')).toBeInstanceOf(Error);
    });
  });

  describe('percentages', () => {
    it('allows percentages', () => {
      expect(SizeProp({ size: '10%' }, 'size')).toBeUndefined();
    });
  });

  describe('stretch', () => {
    it('allows stretch', () => {
      expect(SizeProp({ size: 'stretch' }, 'size')).toBeUndefined();
    });
  });

  describe('other', () => {
    it('expects supported type', () => {
      expect(SizeProp({ size: [] }, 'size')).toBeInstanceOf(Error);
    });

    it('allows size not to be defined', () => {
      expect(SizeProp({ size: undefined }, 'size')).toBeUndefined();
    });
  });
});

describe('HiddenProp', () => {
  describe('hidden', () => {
    it('accepts boolean', () => {
      expect(HiddenProp('md')({ mdHidden: true }, 'mdHidden')).toBeUndefined();
    });

    it('accepts undefined', () => {
      expect(HiddenProp('md')({ mdHidden: undefined }, 'mdHidden')).toBeUndefined();
    });

    it('throws on other types', () => {
      expect(HiddenProp('md')({ mdHidden: 2 }, 'mdHidden')).toBeInstanceOf(Error);
    });

    it('works with un-prefixed value', () => {
      expect(HiddenProp('')({ hidden: 2 }, 'hidden')).toBeInstanceOf(Error);
    });
  });

  describe('visible', () => {
    it('accepts boolean', () => {
      expect(HiddenProp('md')({ mdVisible: true }, 'mdVisible')).toBeUndefined();
    });

    it('accepts undefined', () => {
      expect(HiddenProp('md')({ mdVisible: undefined }, 'mdVisible')).toBeUndefined();
    });

    it('throws on other types', () => {
      expect(HiddenProp('md')({ mdVisible: 2 }, 'mdVisible')).toBeInstanceOf(Error);
    });

    it('works with un-prefixed value', () => {
      expect(HiddenProp('')({ visible: 2 }, 'visible')).toBeInstanceOf(Error);
    });
  });

  describe('hidden and visible', () => {
    it('warns of collision', () => {
      expect(HiddenProp('md')({ mdVisible: true, mdHidden: true }, 'mdHidden')).toBeInstanceOf(Error);
    });
  });
});
