const blogReducer = (state, action) => {
  switch (action.type) {
    
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
        posts: [],
        page_number: 1,
        loading: true,
        article: null,
      };
  }
};

export default blogReducer;
