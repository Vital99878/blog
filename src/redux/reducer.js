const initial_state = {
  'articles': [ {
    'slug': 'how-to-train-your-dragon',
    'title': 'How to train your dragon',
    'description': 'Ever wonder how?',
    'body': 'It takes a Jacobian',
    'tagList': [ 'dragons', 'training' ],
    'createdAt': '2016-02-18T03:22:56.637Z',
    'updatedAt': '2016-02-18T03:48:35.824Z',
    'favorited': true,
    'favoritesCount': 15,
    'author': {
      'username': 'jake',
      'bio': 'I work at statefarm',
      'image': 'https://i.stack.imgur.com/xHWG8.jpg',
      'following': false,
    },
  }, {
    'slug': 'how-to-train-your-dragon-2',
    'title': 'How to train your dragon 2',
    'description': 'So toothless',
    'body': 'It a dragon',
    'tagList': [ 'dragons', 'training' ],
    'createdAt': '2016-02-18T03:22:56.637Z',
    'updatedAt': '2016-02-18T03:48:35.824Z',
    'favorited': false,
    'favoritesCount': 0,
    'author': {
      'username': 'jake',
      'bio': 'I work at statefarm',
      'image': 'https://i.stack.imgur.com/xHWG8.jpg',
      'following': false,
    },
  } ],
  'articlesCount': 2,
  firstName: 'Vital',
  lastName: 'Lihoy',
  email: 'mail@mail.ru',
};

const reducer = ( state = initial_state, action ) => {
  switch ( action.type ) {
    case 'LOGOUT':
      return {
        ...state,
        auth: false
      };

    case 'ALL_TRANSFERS':
      return {
        ...state,
        active_all: action.active_all,
        transfers: action.transfers,
        index: 0,
      };

    case 'SET_ID':
      return { ...state, searchId: action.searchId };

    case 'NEW_TICKETS':

      return {
        ...state,
        index: 0,
      };

    case 'TAB':
      return {
        ...state,
        tab_value: action.tab_value,
        index: 0,
      };

    case 'MORE':
      return {
        ...state,
        index: action.index,
      };

    default:
      return {
        posts: initial_state.articles,
        firstName: 'Vital',
        lastName: 'Lihoy',
        email: 'mail@mail.ru',
        auth: false,
        user: {
          username: 'Vital',
          image: 'https://sun9-32.userapi.com/impg/Xey8t2zJyK0UFlOyMl7Xk-8W5_i268frf776EA/tfPHMuN2YKw.jpg?size=881x700&quality=96&sign=33fdce245441749fb4db391f50f2e6bf&type=album',
        },
        page_number: 1
      };
  }
};

export default reducer;
