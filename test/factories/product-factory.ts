import { Product, ProductProps, Rating, Image } from '@domain/entities';

type Override = Partial<ProductProps>;

export function makeProduct(override: Override = {}, id?: string): Product {
  return new Product(
    {
      name: 'Product name',
      price: 203.44,
      categoryId: 'category-id',
      image: new Image({ path: 'asda', productId: id }),
      rating: new Rating({ rating: 1 }),
      ...override,
    },
    id ? id : 'id-make-product',
  );
}
