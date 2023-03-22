import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offersMock} from './mocks/offers';
import {reviewsMock} from './mocks/reviews';

const Settings = {
  Offers: offersMock,
  Reviews: reviewsMock
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offers={Settings.Offers} reviews={Settings.Reviews} />
  </React.StrictMode>,
);
