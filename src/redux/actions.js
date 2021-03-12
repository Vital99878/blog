import articles_service from '../api/blog_api';
import auth_api         from '../api/auth_api';

// async actions auth
export function signIn( mail, password ) {
  return async ( dispatch ) => {
    const user = await auth_api.get_user( mail, password );
    if ( typeof user !== 'string' ) {
      dispatch( { type: 'SIGN_IN', user, message: '' } );
    }
    if ( typeof user === 'string' ) {
      dispatch( { type: 'NO_EMAIL_ORE_PASSWORD', message: 'email ore password wrong' } );
    }
  };
};

export function signUp( newUser ) {
  return async ( dispatch ) => {
    const user = await auth_api.create_user( newUser );
    if ( user.user) {
      dispatch( { type: 'SIGN_UP', user: user.user} );
    }
    if ( user.errors) {
      const {email: emailValid, username: usernameValid} = user.errors;
      dispatch( { type: 'SIGN_UP_ERRORS', emailValid, usernameValid  } );
    }
  };
};

export function updateUser( newUser, token ) {
  return async ( dispatch ) => {
    const user = await auth_api.update_user( newUser, token );
    console.log(user)
    if ( user.user) {
      dispatch( { type: 'SIGN_UP', user: user.user} );
    }
    if ( user.errors) {
      const {email: emailValid, username: usernameValid} = user.errors;
      dispatch( { type: 'SIGN_UP_ERRORS', emailValid, usernameValid  } );
    }
  };
};

export function getArticles( offset, token = '' ) {
  return async ( dispatch ) => {
    const { articles, articlesCount } = await articles_service.get_articles( offset, token );
    dispatch( { type: 'GET_ARTICLES', articles, articlesCount } );
  };
}

export function postArticle(  article, token) {
    return async ( dispatch ) => {
    const newArticle = await articles_service.post_article( article, token );
    dispatch( { type: 'ONE_ARTICLE', article: newArticle} );
  };
}

export function deleteArticle(  slug, token) {

  return async ( dispatch ) => {
    const newArticle = await articles_service.delete_article( slug, token );
    dispatch( { type: 'ONE_ARTICLE', article: newArticle} );
  };
}

export const isLogOut = () => (
  {
    type: 'LOGOUT',
  });

// async actions Articles

export function getOneArticle( slug, user ) {
  return async ( dispatch ) => {
    const article = await articles_service.get_one_article( slug, user );
    dispatch( { type: 'ONE_ARTICLE', article } );
  };
}

export function addToFavorite( slug, token ) {
  return async ( dispatch ) => {
    const article = await articles_service.add_to_favorite( slug, token );
    dispatch( { type: 'LIKE', article } );
  };
}

export function removeFromFavorite( slug, token ) {
  return async ( dispatch ) => {
    const article = await articles_service.remove_from_favorite( slug, token );
    dispatch( { type: 'DISLIKE', article } );
  };
}

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


