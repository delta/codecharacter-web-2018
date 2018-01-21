const API_BASE_URL = 'http://localhost:3001/user_protected';

export const getAllNotifications = ({req , query}) => {
  return fetch(API_BASE_URL + '/notifications/0',{
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
      console.log(error);
      throw error;
    });
};

export const getUnreadNotifications = ({req , query}) => {
  return fetch(API_BASE_URL + '/notifications/1',{
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
      console.log(error);
      throw error;
    });
};
