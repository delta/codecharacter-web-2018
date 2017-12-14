const API_BASE_URL = 'http://localhost:3000';

/**
 * Promise based function to send a POST request to /login of API
 * @param req
 * @param query
 */

export const userLogin = ({req , query}) => {
  return fetch(API_BASE_URL + 'api/user/login',{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: query.username,
      password: query.password,
    })
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};


export const userCheckUsername = ({req, query}) => {
  return fetch(API_BASE_URL + 'api/user/username', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      return response;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

/**
 * Promise Based function to signup
 * @param req: null
 * @param query: {emailId, name, password}
 * @returns {}
 */
export const userRegister = ({req, query}) => {
  return fetch(API_BASE_URL + 'api/user/register',{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: query.username,
      name: query.username,
      password: query.password,
    })
  })
    .then((response) => {
      return response;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};


export const userLogout = ({req, query}) => {
  return fetch(API_BASE_URL + 'api/user/logout', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      return response;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};


export const userGetProfile = ({req, query}) => {
  return fetch(API_BASE_URL + 'api/user/profile', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      return response;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};


export const userSetProfile = ({req, query}) => {
  return fetch(API_BASE_URL + 'api/user/profile', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: query.username,
      name: query.name,
      password: query.name
    })
  })
    .then((response) => {
      return response;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
