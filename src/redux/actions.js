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

export function getArticles( offset ) {
  return async ( dispatch ) => {
    const { articles, articlesCount } = await articles_service.get_articles( offset );
    dispatch( { type: 'GET_ARTICLES', articles, articlesCount } );
  };
}

export function getOneArticle( slug ) {
  return async ( dispatch ) => {
    const article  = await articles_service.get_one_article( slug );
    dispatch( { type: 'ONE_ARTICLE', article } );
  };
}

export const get_tickets = () => {
  // return async (dispatch) => {
  //   const [new_tickets, stop] = await getTickets(id);
  //   dispatch({ type: 'NEW_TICKETS', new_tickets, stop });
  // };
};

export const set_offset = ( page, offset ) => (
  {
    type: 'OFFSET',
    offset, page,
  });


