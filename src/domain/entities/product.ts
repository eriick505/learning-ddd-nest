import { randomUUID } from 'crypto';

import { Replace } from '@helpers/replace';

import { ProductImage } from './product.image';

export interface ProductProps {
  name: string;
  price: number;
  image: ProductImage;
  categoryId: string;
  rating: number;
}

export class Product {
  private _id: string;
  private props: ProductProps;

  constructor(props: Replace<ProductProps, { image: { path: string } }>) {
    this.validateRatingLength(props.rating);

    this._id = randomUUID();
    this.props = {
      ...props,
      image: new ProductImage({
        path: props.image.path,
        productId: this._id,
      }),
    };
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
    return this.props.rating;
  }

  private validateRatingLength(rating: number) {
    const validation = rating > 0 && rating <= 5;

    if (!validation) throw new Error('Rating length error');

    return;
  }
}
