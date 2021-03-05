const base = 'https://conduit.productionready.io/api/articles';

class Articles_Service {
  async get_articles( offset, user ) {
    if ( user ) {
      const myHeaders = new Headers();
      myHeaders.append( 'Authorization', `Token ${user.token}` );
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      const response = await fetch( `${base}?tag=React&limit=5&offset=${offset}`, requestOptions );
      if ( !response.ok ) {
        throw new Error( `Not working fetch ${base}/search/movie: ${response.status}` );
      }
      return response.json();
    }

    const response = await fetch( `${base}?tag=React&limit=5&offset=${offset}` );
    if ( !response.ok ) {
      throw new Error( `Not working fetch ${base}/search/movie: ${response.status}` );
    }
    return response.json();
  }

  async get_one_article( slug, user ) {
    if ( user ) {
      const myHeaders = new Headers();
      myHeaders.append( 'Authorization', `Token ${user.token}` );
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      const response = await fetch( `${base}/${slug}`, requestOptions );
      if ( !response.ok ) {
        throw new Error( `Not working fetch ${base}/search/movie: ${response.status}` );
      }
      const body = await response.json();
      return body.article;
    }

    const response = await fetch( `${base}/${slug}` );
    if ( !response.ok ) {
      throw new Error( `Error` );
    }
    const body = await response.json();
    return body.article;
  }

  async add_to_favorite( slug, token ) {
    const myHeaders = new Headers();
    myHeaders.append( 'Authorization', `Token ${token}` );
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
    };
    const body = await fetch( `${base}/${slug}/favorite`, requestOptions );
    if ( !body.ok ) {
      return 'Something wrong';
    }
    return [];
  }

  async remove_from_favorite( slug, token ) {
    const myHeaders = new Headers();
    myHeaders.append( 'Authorization', `Token ${token}` );
    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };
    const body = await fetch( `${base}/${slug}/favorite`, requestOptions );
    if ( !body.ok ) {
      return 'Something wrong';
    }
    return [];
  }

  // POST /api/articles/:slug/favorite
  // async edit_article() {
  // }
}

export default new Articles_Service();
