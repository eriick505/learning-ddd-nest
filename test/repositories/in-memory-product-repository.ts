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

  async update(product: Product): Promise<Product> {
    const productIndex = this.productList.findIndex((p) => p.id === product.id);

    if (productIndex < 0) return;

    this.productList[productIndex] = product;

    return this.productList[productIndex];
  }
}
