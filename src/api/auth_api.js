const base = 'https://conduit.productionready.io/api';

class Auth_api {
  async create_user({ username, email, password }) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    const body = await fetch(`${base}/users`, requestOptions);
    const user = await body.json();
    return user;
  }

  async update_user({ username, email, password, avatar }, token) {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Token ${token}`);
    myHeaders.append('Content-Type', 'application/json');
    if (!password) {
      password = null;
    }
    const raw = JSON.stringify({
      user: {
        email,
        username,
        password,
        image: avatar,
      },
    });
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    const body = await fetch(`${base}/user`, requestOptions);
    const user = await body.json();
    return user;
  }

  async get_user(email, password) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      user: {
        email,
        password,
      },
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    const body = await fetch(`${base}/users/login`, requestOptions);
    const user = await body.json();
    return user;
  }
}

export default new Auth_api();
