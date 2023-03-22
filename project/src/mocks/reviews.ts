import {Comment} from '../types/types';

export const reviewsMock: Comment[] = [
  {
    'id': 1,
    'user': {
      'id': 15,
      'isPro': false,
      'name': 'Kendall',
      'avatarUrl': 'https://12.react.pages.academy/static/avatar/6.jpg'
    },
    'rating': 2,
    'comment': 'Bathed in the nature. Completely unplugged. Unforgettable.',
    'date': '2023-02-19T07:31:24.880Z'
  },
  {
    'id': 2,
    'user': {
      'id': 13,
      'isPro': false,
      'name': 'Zak',
      'avatarUrl': 'https://12.react.pages.academy/static/avatar/4.jpg'
    },
    'rating': 5,
    'comment': 'Bathed in the nature. Completely unplugged. Unforgettable.',
    'date': '2023-02-09T07:31:24.881Z'
  },
  {
    'id': 3,
    'user': {
      'id': 15,
      'isPro': false,
      'name': 'Kendall',
      'avatarUrl': 'https://12.react.pages.academy/static/avatar/6.jpg'
    },
    'rating': 2,
    'comment': 'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.',
    'date': '2023-03-04T07:31:24.881Z'
  },
  {
    'id': 4,
    'user': {
      'id': 19,
      'isPro': false,
      'name': 'Christina',
      'avatarUrl': 'https://12.react.pages.academy/static/avatar/10.jpg'
    },
    'rating': 3,
    'comment': 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    'date': '2023-03-04T07:31:24.881Z'
  }
];
