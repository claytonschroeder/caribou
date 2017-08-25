class Api {

  static json(path) {
    return fetch('/api' + path, {
      credentials: 'include'
    }).then(response => {
      if(!response.ok) {
        throw Error('could not get /api' + path)
      }
      return response
    }).then(data => data.json());
  }

  static post(path, data) {
    // we should really do this all the time and expect objects to be passed in as data.
    if(typeof data === 'object') {
      data = JSON.stringify(data);
    }

    return fetch('/api' + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
      credentials: 'include'
    }).then(response => response.json());
  }

  static upload(path, data) {
    return fetch('/api' + path, {
      method: 'POST',
      body: data
    }).then(response => response.json());
  }

  static put(path, data) {
    return fetch('/api' + path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }).then(response => response.json());
  }
}

export default Api;