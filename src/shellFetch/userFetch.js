import { API_BASE_URL } from '../config/config';

export const userLogin = ({req , query}) => {
  return fetch(API_BASE_URL + 'user/login',{
    method: "POST",
    credentials: 'include',
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

export const userRegister = ({req, query}) => {
  return fetch(API_BASE_URL + 'user/signup',{
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emailId: query.emailId,
      name: query.username,
      password: query.password,
      nationality: query.nationality
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

export const userLoginStatus = ({req , query}) => {
  return fetch(API_BASE_URL + 'user/login',{
    method: "GET",
    credentials: 'include',
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

export const userLogout = () => {
  return fetch(API_BASE_URL + 'user/logout', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
    })
    .catch((error) => {
      console.log(error);
    });
};
