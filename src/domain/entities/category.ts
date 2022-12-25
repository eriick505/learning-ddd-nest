import { randomUUID } from 'crypto';

export class Category {
  private _id: string;
  private _name: string;

  constructor(name: string) {
    this._id = randomUUID();
    this._name = name;
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }
}
