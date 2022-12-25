import { Product, ProductProps } from '@domain/entities';

type Override = Partial<ProductProps>;

export function makeProduct(override: Override = {}) {
  return new Product({
    name: 'Product name',
    price: 203.44,
    rating: 3.4,
    categoryId: 'category-id',
    image: {
      path: 'http://teste.com/image.png',
    },
    ...override,
  });
}
