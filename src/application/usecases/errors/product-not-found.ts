export class ProductNotFound extends Error {
  constructor() {
    super('Notification not found');
  }
}
