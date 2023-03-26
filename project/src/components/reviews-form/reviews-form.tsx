import React, {ChangeEvent, Dispatch, Fragment, SetStateAction, useState} from 'react';

export const RATING_TYPE: string[] = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

const ReviewsForm = () => {
  const [formData, setFormData]: [[number, string], Dispatch<SetStateAction<[number, string]>>] = useState([0, '']);
  //TODO: звёдочки не отображаются после клика

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_TYPE.map((currentRating: string, count: number): JSX.Element => {
          const value: number = RATING_TYPE.length - count;

          return (
            <Fragment key={Math.random() * Number.MAX_VALUE}>
              <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio"
                onChange={({target}: ChangeEvent<HTMLInputElement>) => setFormData([Number(target.value), formData[1]])}
              />
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={currentRating}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => setFormData([formData[0], target.value])}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
};

export default ReviewsForm;
