import {ReducerWithInitialState} from '@reduxjs/toolkit/dist/createReducer';
import {Review} from '../../../types/types';
import {ReviewState} from '../../../types/state';
import {ActionReducerMapBuilder, createReducer, PayloadAction} from '@reduxjs/toolkit';
import {loadComments, setCommentLoadingStatus} from '../../action';

const initialState: ReviewState = {
  reviews: [],
  isReviewSending: false
};

export const reviewReducer: ReducerWithInitialState<ReviewState> = createReducer(initialState, (builder: ActionReducerMapBuilder<ReviewState>): void => {
  builder
    .addCase(loadComments, (state: ReviewState, action: PayloadAction<Review[]>): void => {
      state.reviews = action.payload;
    })
    .addCase(setCommentLoadingStatus, (state: ReviewState, action: PayloadAction<boolean>): void => {
      state.isReviewSending = action.payload;
    });
});
