
import articles_service from '../api/blog_api';
import auth_api         from '../api/auth_api';

// async actions auth

export function signIn( mail, password ) {
  return async ( dispatch ) => {
    const { user, errors } = await auth_api.get_user( mail, password );
    if ( typeof user !== 'string' ) {
      dispatch( { type: 'SIGN_IN', user, message: '' } );
    }
    if (errors ) {
      dispatch( { type: 'EMAIL_OR_PASSWORD_IS_INVALID', message: 'email or password is invalid' } );
    }
  };
}

export function signUp( newUser ) {
  return async ( dispatch ) => {
    const { user, errors } = await auth_api.create_user( newUser );
    if ( user.user) {
      dispatch( { type: 'SIGN_UP', user: user.user} );
    }
    if ( user.errors) {
      const {email: emailValid, username: usernameValid} = user.errors;
      dispatch( { type: 'SIGN_UP_ERRORS', emailValid, usernameValid  } );
    }
  };
}

export function updateUser( newUser, token ) {
  return async ( dispatch ) => {
    const user = await auth_api.update_user( newUser, token );
    if ( user.user) {
      dispatch( { type: 'SIGN_UP', user: user.user} );
    }
    if ( user.errors) {
      const {email: emailValid, username: usernameValid} = user.errors;
      dispatch( { type: 'SIGN_UP_ERRORS', emailValid, usernameValid  } );
    }
  };
}

export const isLogOut = () => {
  localStorage.removeItem( 'email' )
  localStorage.removeItem( 'token' )
  localStorage.removeItem( 'image' )
  localStorage.removeItem( 'username')
  localStorage.removeItem( 'createdAt' )
  localStorage.removeItem( 'updatedAt' )
  return   {
    type: 'LOGOUT',
  }
}

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

export function postArticle(  article, token) {
  return async (  ) => {
    const newArticle = await articles_service.post_article( article, token );
    return newArticle
  };
}

export function updateArticle(  article, token, slug) {
  return async (  ) => {
    const newArticle = await articles_service.update_article( article, token, slug );
    return newArticle
  };
}

export function deleteArticle(  slug, token) {
  return async ( dispatch ) => {
    const newArticle = await articles_service.delete_article( slug, token );
    dispatch( { type: 'ONE_ARTICLE', article: newArticle} );
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

export const set_offset = ( page, offset ) => ({
    type: 'OFFSET',
    offset, page,
  });

export const user_from_ls = (  ) => {

  const user = {
    email: localStorage.getItem( 'email' ),
    token : localStorage.getItem( 'token' ),
    image : localStorage.getItem( 'image' ),
    username: localStorage.getItem( 'username' ),
    createdAt: localStorage.getItem( 'createdAt' ),
    updatedAt: localStorage.getItem( 'updatedAt' )
  }
  return {
    type: 'COOKIES',
    user
  }
}


