import { randomUUID } from 'crypto';

export interface ProductImageProps {
  path: string;
  productId: string;
}

export class ProductImage {
  private _id: string;
  private props: ProductImageProps;

  constructor(props: ProductImageProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get path() {
    return this.props.path;
  }

  public get productId() {
    return this.props.productId;
  }
}
