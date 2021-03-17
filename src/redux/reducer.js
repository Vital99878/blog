const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        auth: true,
        user: action.user,
        username: action.user.username,
        responseValidation: false,
      };

    case 'SIGN_UP':
      return {
        ...state,
        auth: true,
        user: action.user,
        username: action.user.username,
        emailValid: '',
        usernameValid: '',
      };

    case 'LOGOUT':
      return {
        ...state,
        auth: false,
        user: null,
        username: '',
        responseValidation: false,
      };

    case 'COOKIES':
      return {
        ...state,
        user: action.user,
      };

    case 'NO_EMAIL_ORE_PASSWORD':
      return {
        ...state,
        responseValidation: action.message,
      };

    case 'SIGN_UP_ERRORS':
      return {
        ...state,
        emailValid: action.emailValid,
        usernameValid: action.usernameValid,
      };

    case 'GET_ARTICLES':
      return {
        ...state,
        posts: action.articles,
        pages: Math.round(action.articlesCount / 5),
        loading: false,
      };

    case 'ONE_ARTICLE':
      return {
        ...state,
        article: action.article,
      };

    case 'ARTICLE_NULL':
      return {
        ...state,
        article: null,
      };

    case 'OFFSET':
      return { ...state, offset: action.offset, page_number: action.page, loading: true };

    case 'LIKE':
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.slug === action.article.slug) {
            return action.article;
          }
          return post;
        }),
        article: action.article,
      };

    case 'DISLIKE':
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.slug === action.article.slug) {
            return action.article;
          }
          return post;
        }),
        article: action.article,
      };

    default:
      return {
        auth: false,
        user: null,
        responseValidation: '',
        posts: [],
        page_number: 1,
        loading: true,
        article: null,
      };
  }
};

export default reducer;
