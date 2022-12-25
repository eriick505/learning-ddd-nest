import { Product } from '@domain/entities';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;
  abstract findById(productId: string): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
  abstract remove(productId: string): Promise<void>;
  abstract update(productId: string): Promise<Product>;
}
