import { Product } from '@domain/entities';
import { RatingInvalidError } from '@domain/entities/product/errors/rating-invalid-error';
import { left } from '@shared/application/either';
import { makeProduct } from '@test/factories';

describe('Product', () => {
  it('should be able to create a product', () => {
    expect(makeProduct()).toBeTruthy();
  });

  it('should not be able to create a product with rating less than 0', () => {
    const rating = 6;

    const product = Product.create({
      name: 'Product name',
      price: 203.44,
      categoryId: 'category-id',
      image: { path: 'asda' },
      rating,
    });

    expect(product).toEqual(left(new RatingInvalidError(rating)));
  });

  it('should not be able to create a product with rating more than 5', () => {
    const rating = 6;

    const product = Product.create({
      name: 'Product name',
      price: 203.44,
      categoryId: 'category-id',
      image: { path: 'asda' },
      rating,
    });

    expect(product).toEqual(left(new RatingInvalidError(rating)));
  });
});
