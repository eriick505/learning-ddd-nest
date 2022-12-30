import { Injectable } from '@nestjs/common';

import { Product } from '@domain/entities';
import { ProductRepository } from '@domain/repositories';

import { ProductNotFound } from '@application/usecases';
import { Either, left, right } from '@shared/application/either';

export interface GetProductRequest {
  productId: string;
}

export interface GetProductData {
  product: Product;
}

export type GetProductResponse = Either<ProductNotFound, GetProductData>;

@Injectable()
export class GetProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: GetProductRequest): Promise<GetProductResponse> {
    const { productId } = request;

    const product = await this.productRepository.findById(productId);

    if (!product) {
      return left(new ProductNotFound());
    }

    return right({
      product,
    });
  }
}
