import { Injectable } from '@nestjs/common';

import { Product } from '@domain/entities';
import { ProductRepository } from '@domain/repositories';

import { ProductNotFound } from '@application/usecases';

export interface GetProductRequest {
  productId: string;
}

export interface GetProductResponse {
  product: Product;
}

@Injectable()
export class GetProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: GetProductRequest): Promise<GetProductResponse> {
    const { productId } = request;

    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    return {
      product,
    };
  }
}
