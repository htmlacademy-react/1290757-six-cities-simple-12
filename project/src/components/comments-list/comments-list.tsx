import {Comment} from '../../types/types';
import CommentItem from '../comment-item/comment-item';
import React from 'react';
import {State} from '../../store/reducer';
import {useAppSelector} from '../../hooks/util';

const CommentsList = (): JSX.Element => {
  const {comments}: State = useAppSelector((state: State) => state);
  const sortedComments: Comment[] = comments?.length >= 2
    ? [...comments].sort((a: Comment, b: Comment) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : comments;
  const shownReviews: Comment[] = sortedComments.slice(0, 10);

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
