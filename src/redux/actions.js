import articles_service from '../api/blog_api';
import auth_api         from '../api/auth_api';

// async actions auth
export function signIn( mail, password ) {
  return async ( dispatch ) => {
    const user = await auth_api.get_user( mail, password );
    if ( typeof user !== 'string' ) {
      dispatch( { type: 'SIGN_IN', user } );
    }
  };
};

export const isLogOut = () => (
  {
    type: 'LOGOUT',
  });

// async actions Articles

export function getArticles( offset, token = '' ) {
  return async ( dispatch ) => {
    const { articles, articlesCount } = await articles_service.get_articles( offset, token );
    dispatch( { type: 'GET_ARTICLES', articles, articlesCount } );
  };
}

export function getOneArticle( slug, user ) {
  return async ( dispatch ) => {
    const article = await articles_service.get_one_article( slug, user );
    dispatch( { type: 'ONE_ARTICLE', article } );
  };
}

// export function addToFavorite( slug, token ) {
//   return async ( dispatch ) => {
//     await articles_service.add_to_favorite( slug, token );
//     dispatch( { type: 'LIKE' } );
//   };
// }
// export function removeFromFavorite( slug, token ) {
//   return async ( dispatch ) => {
//     await articles_service.remove_from_favorite( slug, token );
//     dispatch( { type: 'DISLIKE' } );
//   };
// }



export const set_offset = ( page, offset ) => (
  {
    type: 'OFFSET',
    offset, page,
  });


