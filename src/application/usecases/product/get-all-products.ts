import { Injectable } from '@nestjs/common';

import { Product } from '@domain/entities';
import { ProductRepository } from '@domain/repositories';

export interface GetAllProductRequest {
  productId: string;
}

export interface GetAllProductResponse {
  products: Product[];
}

@Injectable()
export class GetAllProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<GetAllProductResponse> {
    const products = await this.productRepository.findAll();

    return {
      products,
    };
  }
}
