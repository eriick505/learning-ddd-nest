import { ProductRepository } from '@domain/repositories';
import { Injectable } from '@nestjs/common';

export interface DeleteProductRequest {
  productId: string;
}

export interface DeleteProductResponse {
  message: string;
}

@Injectable()
export class DeleteProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: DeleteProductRequest): Promise<DeleteProductResponse> {
    const { productId } = request;

    await this.productRepository.remove(productId);

    return {
      message: 'Product has been deleted',
    };
  }
}
