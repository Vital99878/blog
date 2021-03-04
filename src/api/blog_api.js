const base = 'https://conduit.productionready.io/api/articles';

class Articles_Service {
  async get_articles( offset ) {
    const response = await fetch( `${base}?limit=5&offset=${offset}` );
    if ( !response.ok ) {
      throw new Error( `Not working fetch ${base}/search/movie: ${response.status}` );
    }
    const body = await response.json();
    return body;
  }

  // async create_article() {
  // }
  //
  // async edit_article() {
  // }

}

export default new Articles_Service();