import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {reviewsMock} from './mocks/reviews';
import {Provider} from 'react-redux';
import {store} from './store';
import ErrorMessage from './components/error-message/error-message';
import {checkAuthAction, fetchOffersAction} from './store/api-action';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

const Settings = {
  Reviews: reviewsMock
} as const;

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App reviews={Settings.Reviews} />
    </ Provider>
  </React.StrictMode>,
);
