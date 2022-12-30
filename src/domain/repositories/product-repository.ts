import { Product, CreateProductData } from '@domain/entities';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>;
  abstract findById(productId: string): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
  abstract remove(productId: string): Promise<void>;
  abstract update(product: Partial<CreateProductData>): Promise<Product>;
}
