// const initial_state = {
//   'articles': [ {
//     'slug': 'how-to-train-your-dragon',
//     'title': 'How to train your dragon',
//     'description': 'Ever wonder how?',
//     'body': 'It takes a Jacobian',
//     'tagList': [ 'dragons', 'training' ],
//     'createdAt': '2016-02-18T03:22:56.637Z',
//     'updatedAt': '2016-02-18T03:48:35.824Z',
//     'favorited': true,
//     'favoritesCount': 15,
//     'author': {
//       'username': 'jake',
//       'bio': 'I work at statefarm',
//       'image': 'https://i.stack.imgur.com/xHWG8.jpg',
//       'following': false,
//     },
//   }, {
//     'slug': 'how-to-train-your-dragon-2',
//     'title': 'How to train your dragon 2',
//     'description': 'So toothless',
//     'body': 'It a dragon',
//     'tagList': [ 'dragons', 'training' ],
//     'createdAt': '2016-02-18T03:22:56.637Z',
//     'updatedAt': '2016-02-18T03:48:35.824Z',
//     'favorited': false,
//     'favoritesCount': 0,
//     'author': {
//       'username': 'jake',
//       'bio': 'I work at statefarm',
//       'image': 'https://i.stack.imgur.com/xHWG8.jpg',
//       'following': false,
//     },
//   } ],
//   'articlesCount': 2,
//   firstName: 'Vital',
//   lastName: 'Lihoy',
//   email: 'mail@mail.ru',
// };

const reducer = ( state , action ) => {
  switch ( action.type ) {

    case 'SIGN_IN':
      return {
        ...state,
        auth: true,
        user: action.user,
        username: action.user.username
      };

    case 'LOGOUT':
      return {
        ...state,
        auth: false,
        user: null,
        username: ''
      };

    case 'ONE_ARTICLE':
      return {
        ...state,
        article: action.article,
      };

    case 'GET_ARTICLES':
      return {
        ...state,
        posts: action.articles,
        pages: Math.round( action.articlesCount / 5 ),
        loading: false,
      };

    case 'OFFSET':
      return { ...state, offset: action.offset, page_number: action.page, loading: true };

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
        posts: [],
        firstName: 'Vital',
        lastName: 'Lihoy',
        email: 'mail@mail.ru',
        auth: false,
        user: null,
        page_number: 1,
        loading: true,
        username: ''
      };
  }
};

export default reducer;
