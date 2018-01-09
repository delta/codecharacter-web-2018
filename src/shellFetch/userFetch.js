const API_BASE_URL = 'http://localhost:3001';

/**
 * Promise based function to send a POST request to /login of API
 * @param req
 * @param query
 */

export const userLogin = ({req , query}) => {
  return fetch(API_BASE_URL + '/user/login',{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emailId: query.emailId,
      password: query.password,
    })
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const userLoginStatus = ({req , query}) => {
  return fetch(API_BASE_URL + '/user/login',{
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

/*
export const userLogin = ({req , query}) => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Credentials', 'include');
  return fetch(API_BASE_URL + '/user/login',{
    method: "POST",
    // mode: 'cors',
    // credentials: 'include',
    body: JSON.stringify({
      emailId: query.emailId,
      password: query.password,
    }),
    headers: headers
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(document.cookie);
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const userLoginStatus = ({req , query}) => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // headers.append('Access-Control-Allow-Credentials', 'true');
  return fetch(API_BASE_URL + '/user/login',{
    method: "GET",
    // mode: 'cors',
    // credentials: 'include',
    headers: headers,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(document.cookie);
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};
*/

/**
 * Promise Based function to signup
 * @param req: null
 * @param query: {emailId, name, password}
 * @returns {}
 */
export const userRegister = ({req, query}) => {
  return fetch(API_BASE_URL + '/user/signup',{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emailId: query.emailId,
      name: query.username,
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
    });
};

export const userLogout = () => {
  return fetch(API_BASE_URL + '/user/logout', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
    });
};
