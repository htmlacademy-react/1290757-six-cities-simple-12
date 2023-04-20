import {Review} from '../../types/types';
import {ReviewState, State} from '../../types/state';
import ReviewItem from '../review-item/review-item';
import React from 'react';
import {useAppSelector} from '../../hooks/util';

const ReviewsList = (): JSX.Element => {
  const {reviews}: ReviewState = useAppSelector((state: State) => state.reviewReducer);
  const sortedComments: Review[] = reviews?.length >= 2
    ? [...reviews].sort((comment: Review, ComparedComment: Review) => new Date(ComparedComment.date).getTime() - new Date(comment.date).getTime())
    : reviews;
  const shownReviews: Review[] = sortedComments.slice(0, 10);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {shownReviews.map((comment: Review): JSX.Element => (
          <ReviewItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </>
  );
};

export default React.memo(ReviewsList);
