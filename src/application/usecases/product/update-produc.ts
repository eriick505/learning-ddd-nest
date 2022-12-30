import { Injectable } from '@nestjs/common';

import { CreateProductData, Product } from '@domain/entities';
import { ProductRepository } from '@domain/repositories';

import { GetProduct } from '@application/usecases';
import { ProductNotFound } from '@application/usecases/errors';

import { Either, left, right } from '@shared/application/either';

export interface UpdateProductRequest {
  id: string;
  data: Partial<CreateProductData>;
}

export interface UpdateProductData {
  product: Product;
}

export type UpdateProductResponse = Either<ProductNotFound, UpdateProductData>;

@Injectable()
export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: UpdateProductRequest): Promise<UpdateProductResponse> {
    const { id, data } = request;
    const getProduct = new GetProduct(this.productRepository);

    const productOrError = await getProduct.execute({ productId: id });

    if (productOrError.isLeft()) {
      return left(new ProductNotFound());
    }

    const updatedProduct = await this.productRepository.update(data);

    return right({ product: updatedProduct });
  }
}
