import {Review} from '../../types/types';

const MONTH_LOCALE = 'en-US';
const MONTH_FORMAT = 'long';

type ReviewProperty = {
  comment: Review;
}

type FormattedDate = {
  dateTime: string;
  visibleDate: string;
}

const getFormattedDate = (commentDate: string): FormattedDate => {
  const date: Date = new Date(commentDate);
  const year: string = date.getFullYear().toString();
  const monthAsString: string = new Intl.DateTimeFormat(MONTH_LOCALE, { month: MONTH_FORMAT }).format(date);
  let month: string = (date.getMonth() + 1).toString();
  let day: string = date.getDate().toString();

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  return {
    dateTime: `${year}-${month}-${day}`,
    visibleDate: `${monthAsString} ${year}`
  };
};

const ReviewItem = ({comment}: ReviewProperty): JSX.Element => {
  const starRating: string = ((comment.rating / 5) * 100).toFixed();
  const formattedDate: FormattedDate = getFormattedDate(comment.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${starRating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}</p>
        <time className="reviews__time" dateTime={formattedDate.dateTime}>{formattedDate.visibleDate}</time>
      </div>
    </li>
  );
};

export default ReviewItem;
