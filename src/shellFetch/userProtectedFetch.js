import { API_BASE_URL } from '../config/config';

export const getAllNotifications = ({req , query}) => {
  return fetch(API_BASE_URL + 'user_protected/notifications/0',{
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
      return error;
    });
};

export const getUnreadNotifications = ({req , query}) => {
  return fetch(API_BASE_URL + 'user_protected/notifications/1',{
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
      return error;
    });
};

export const deleteNotification = ({req , query}) => {
  return fetch(API_BASE_URL + 'user_protected/delete_notification',{
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nId: query.nId
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
      return error;
    });
};

export const getUsersLength = ({req, query}) => {
  return fetch(API_BASE_URL + 'user/all',{
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
      return error;
    });
};

export const getUserProfile = ({req, query}) => {
  return fetch(API_BASE_URL + 'user/profile/' + query.id.toString(), {
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
      return error;
    });
};

export const getUserViewProfile = ({req, query}) => {
  return fetch(API_BASE_URL + 'user/name/' + query.name, {
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
      return error;
    });
};

export const changeUserName = ({req, query}) => {
  return fetch(API_BASE_URL + 'user_protected/change', {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: query.name
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
      return error;
    });
};
