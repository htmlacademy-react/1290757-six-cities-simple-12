import {Comment} from '../../types/types';
import CommentItem from '../comment-item/comment-item';
import React from 'react';
import {State} from '../../store/reducer';
import {useAppSelector} from '../../hooks/util';

const CommentsList = (): JSX.Element => {
  const {comments}: State = useAppSelector((state: State) => state);
  const shownReviews: Comment[] = comments.slice(0, 10);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {shownReviews.map((comment: Comment): JSX.Element => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </>
  );
};

export default CommentsList;
