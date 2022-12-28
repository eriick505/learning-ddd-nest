export class RatingInvalidError extends Error {
  constructor(rating: number) {
    super(`The rating ${rating} is invalid`);
  }
}
