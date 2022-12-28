import { Injectable } from '@nestjs/common';

import { Product } from '@domain/entities';
import { ProductRepository } from '@domain/repositories';
import { Either, left, right } from '@shared/application/either';
import { RatingInvalidError } from '@domain/entities/product/errors/rating-invalid-error';

export interface CreateProductRequest {
  name: string;
  price: number;
  image: {
    path: string;
  };
  categoryId: string;
  rating: number;
}

export interface Response {
  product: Product;
}

export type CreateProductResponse = Promise<
  Either<RatingInvalidError, Response>
>;

@Injectable()
export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: CreateProductRequest): CreateProductResponse {
    const { name, price, image, categoryId, rating } = request;

    const productOrError = Product.create({
      name,
      price,
      image,
      categoryId,
      rating,
    });

    if (productOrError.isLeft()) {
      return left(productOrError.value);
    }

    const product: Product = productOrError.value;

    await this.productRepository.create(product);

    return right({ product });
  }
}
