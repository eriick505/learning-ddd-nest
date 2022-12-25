import { Injectable } from '@nestjs/common';

import { Product } from '@domain/entities';
import { ProductRepository } from '@domain/repositories';

export interface CreateProductRequest {
  name: string;
  price: number;
  image: {
    path: string;
  };
  categoryId: string;
  rating: number;
}

export interface CreateProductResponse {
  product: Product;
}

@Injectable()
export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const { name, price, image, categoryId, rating } = request;

    const product = new Product({
      name,
      price,
      image: {
        path: image.path,
      },
      categoryId,
      rating,
    });

    await this.productRepository.create(product);

    return {
      product,
    };
  }
}
