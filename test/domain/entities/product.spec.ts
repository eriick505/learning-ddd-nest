import { makeProduct } from '@test/factories';

describe('Product', () => {
  it('should be able to create a product', () => {
    expect(makeProduct()).toBeTruthy();
  });

  it('should not be able to create a product with rating less than 0', () => {
    expect(() => {
      makeProduct({ rating: -1 });
    }).toThrow();
  });

  it('should not be able to create a product with rating more than 5', () => {
    expect(() => {
      makeProduct({ rating: 6 });
    }).toThrow();
  });
});
