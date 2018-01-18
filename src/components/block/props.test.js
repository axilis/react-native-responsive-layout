import { GRID_UNITS } from '../../shared/constants';
import { SizeProp } from './props';


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

  describe('specific widths', () => {
    it('allows positive number', () => {
      expect(SizeProp({ size: 10 }, 'size')).toBeUndefined();
    });

    it('expects positive number', () => {
      expect(SizeProp({ size: -2 }, 'size')).toBeInstanceOf(Error);
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
