import { Image } from '@domain/entities';

describe('ProductImage', () => {
  it('should be able to create a product image', () => {
    const image = Image.create({
      path: 'http://teste.com/image.png',
      productId: 'product-id',
    });

    expect(image).toBeTruthy();
  });
});
