const base = 'https://conduit.productionready.io/api';


class Auth_api {

  async get_user(email, password) {
    const myHeaders = new Headers();
    myHeaders.append( 'Content-Type', 'application/json' );
    const raw = JSON.stringify( {
                                  user: {
                                    email,
                                    password,
                                  },
                                } );
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    const body = await fetch(`${base}/users/login`, requestOptions);
    if ( body.status === 422) {
      return 'email ore password wrong'
    }
    const user = await body.json()
    return user.user;
  }

  // async create_article() {
  // }
  //
  // async edit_article() {
  // }
}

export default new Auth_api();