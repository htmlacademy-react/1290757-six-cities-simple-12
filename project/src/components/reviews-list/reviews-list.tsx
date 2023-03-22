import {Comment} from '../../types/types';
import Review from '../review/review';
import React from 'react';

type ReviewsListProperty = {
  reviews: Comment[];
}

const ReviewsList = ({reviews}: ReviewsListProperty): JSX.Element => (
  <>
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {reviews.map((review: Comment): JSX.Element => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  </>
);

export default ReviewsList;
