import { Product } from '@domain/entities';
import { ProductRepository } from '@domain/repositories';
import { Injectable } from '@nestjs/common';

export interface UpdateProductRequest {
  productId: string;
}

export interface UpdateProductResponse {
  product: Product;
}

@Injectable()
export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: UpdateProductRequest): Promise<UpdateProductResponse> {
    const { productId } = request;

    const updatedProduct = await this.productRepository.update(productId);

    return {
      product: updatedProduct,
    };
  }
}
