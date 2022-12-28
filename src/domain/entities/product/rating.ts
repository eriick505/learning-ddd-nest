import { Either, left, right } from '@shared/application/either';

import { RatingInvalidError } from './errors/rating-invalid-error';

export interface RatingProps {
  rating: number;
}

export class Rating {
  private props: RatingProps;

  constructor(props: RatingProps) {
    this.props = props;
  }

  public static create(props: RatingProps): Either<RatingInvalidError, Rating> {
    if (!this.validateRatingLength(props.rating)) {
      return left(new RatingInvalidError(props.rating));
    }

    return right(new Rating(props));
  }

  public get rating() {
    return this.props.rating;
  }

  private static validateRatingLength(rating: number) {
    return rating > 0 && rating <= 5;
  }
}
