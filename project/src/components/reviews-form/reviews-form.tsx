import React, {ChangeEvent, Dispatch, Fragment, SetStateAction, useState} from 'react';

enum RatingType {
  Perfect = 'perfect',
  Good = 'good',
  NotBad = 'not bad',
  Badly = 'badly',
  Terribly = 'terribly',
}

type ReviewsFormState = {
  rating: number;
  comment: string;
}

const RATINGS: RatingType[] = [RatingType.Perfect, RatingType.Good, RatingType.NotBad, RatingType.Badly, RatingType.Terribly];

const ReviewsForm = () => {
  const [formData, setFormData]: [ReviewsFormState, Dispatch<SetStateAction<ReviewsFormState>>] = useState({rating: 0, comment: ''});

  const getStartRating = (currentRating: string, count: number) => {
    const value: number = RATINGS.length - count;

    return (
      <Fragment key={Math.random() * Number.MAX_VALUE}>
        <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio"
          onChange={({target}: ChangeEvent<HTMLInputElement>) => setFormData({rating: Number(target.value), comment: formData.comment})}
          checked={value === formData.rating}
        />
        <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={currentRating}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </Fragment>
    );
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((currentRating: string, count: number): JSX.Element => getStartRating(currentRating, count))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => setFormData({rating: formData.rating, comment: target.value})}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={formData.rating < 1 || formData.comment.length < 50}>Submit</button>
      </div>
    </form>
  );
};

export default ReviewsForm;
