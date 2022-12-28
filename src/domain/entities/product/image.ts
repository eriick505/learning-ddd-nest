import { randomUUID } from 'crypto';

export interface ImageProps {
  path: string;
  productId: string;
}

export class Image {
  private _id: string;
  private props: ImageProps;

  constructor(props: ImageProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public static create(props: ImageProps) {
    return new Image(props);
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
