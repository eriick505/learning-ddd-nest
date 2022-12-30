import { Injectable } from '@nestjs/common';

import { CreateProductData, Product } from '@domain/entities';
import { ProductRepository } from '@domain/repositories';

import { GetProduct } from '@application/usecases';
import { ProductNotFound } from '@application/usecases/errors';

import { Either, left, right } from '@shared/application/either';
import { RatingInvalidError } from '@domain/entities/product/errors/rating-invalid-error';

export interface UpdateProductRequest {
  id: string;
  data: Partial<CreateProductData>;
}

export interface UpdateProductData {
  product: Product;
}

export type UpdateProductResponse = Either<
  ProductNotFound | RatingInvalidError,
  UpdateProductData
>;

@Injectable()
export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: UpdateProductRequest): Promise<UpdateProductResponse> {
    const { id, data } = request;
    const getProduct = new GetProduct(this.productRepository);

    const getProductOrError = await getProduct.execute({ productId: id });

    if (getProductOrError.isLeft()) {
      return left(getProductOrError.value);
    }

    const { product: oldProduct } = getProductOrError.value;

    const newProductOrError = Product.create(
      {
        name: data.name ?? oldProduct.name,
        price: data.price ?? oldProduct.price,
        image: {
          path: data.image?.path ?? oldProduct.image.path,
        },
        categoryId: data.categoryId ?? oldProduct.categoryId,
        rating: data.rating ?? oldProduct.rating,
      },
      oldProduct.id,
    );

    if (newProductOrError.isLeft()) {
      return left(newProductOrError.value);
    }

    const newProduct = newProductOrError.value;

    const updatedProduct = await this.productRepository.update(newProduct);

    return right({ product: updatedProduct });
  }
}
