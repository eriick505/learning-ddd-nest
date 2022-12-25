import { Product } from '@domain/entities';
import { ProductRepository } from '@domain/repositories';

export class InMemoryProductRepository implements ProductRepository {
  public productList: Product[] = [];

  async create(product: Product): Promise<void> {
    this.productList.push(product);
  }

  async findById(productId: string): Promise<Product> {
    return this.productList.find((product) => product.id === productId);
  }

  async findAll(): Promise<Product[]> {
    return this.productList;
  }

  async remove(productId: string): Promise<void> {
    this.productList = this.productList.filter(
      (product) => product.id !== productId,
    );
  }

  async update(productId: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
}
