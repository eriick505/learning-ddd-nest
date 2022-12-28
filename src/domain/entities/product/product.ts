import { randomUUID } from 'crypto';

import { Image } from './image';
import { Rating } from './rating';
import { Either, left, right } from '@shared/application/either';
import { RatingInvalidError } from './errors/rating-invalid-error';

export interface ProductProps {
  name: string;
  price: number;
  image: Image;
  categoryId: string;
  rating: Rating;
}

export interface CreateProductData {
  name: string;
  price: number;
  image: {
    path: string;
  };
  categoryId: string;
  rating: number;
}

export class Product {
  private _id: string;
  private props: ProductProps;

  constructor(props: ProductProps, id: string) {
    this._id = id;
    this.props = props;
  }

  public static create(
    props: CreateProductData,
  ): Either<RatingInvalidError, Product> {
    const productId = randomUUID();

    const ratingOrError = Rating.create({ rating: props.rating });
    const image = Image.create({ productId, path: props.image.path });

    if (ratingOrError.isLeft()) {
      return left(ratingOrError.value);
    }

    return right(
      new Product(
        {
          name: props.name,
          price: props.price,
          image,
          categoryId: props.categoryId,
          rating: ratingOrError.value,
        },
        productId,
      ),
    );
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.props.name;
  }

  public get price() {
    return this.props.price;
  }

  public get image() {
    return this.props.image;
  }

  public get categoryId() {
    return this.props.categoryId;
  }

  public get rating() {
    return this.props.rating.rating;
  }
}
