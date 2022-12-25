import { ProductImage } from '@domain/entities';

describe('ProductImage', () => {
  it('should be able to create a product image', () => {
    const productImage = new ProductImage({
      path: 'http://teste.com/image.png',
      productId: 'product-id',
    });

    expect(productImage).toBeTruthy();
  });
});
