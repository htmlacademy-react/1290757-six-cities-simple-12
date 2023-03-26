import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offersMock} from './mocks/offers';
import {reviewsMock} from './mocks/reviews';
import {Provider} from 'react-redux';
import {store} from './store';

const Settings = {
  Offers: offersMock,
  Reviews: reviewsMock
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={Settings.Offers} reviews={Settings.Reviews} />
    </ Provider>
  </React.StrictMode>,
);
