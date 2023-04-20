import {PayloadAction} from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import index from '../reducers';
import browserHistory from '../../util/browser-history';

type Reducer = ReturnType<typeof index>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'app/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
