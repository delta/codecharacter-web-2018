import { API_BASE_URL } from '../config/config';

export const codeFetch = () => {
  return fetch(API_BASE_URL + 'code/',{
    method: "GET",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
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
      // throw error;
    });
};


export const getCodeStatus = ({req,query}) => {
  return fetch(API_BASE_URL + 'code/code_status', {
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
      // throw error;
    });
};

export const codeLock = ({req , query}) => {
  return fetch(API_BASE_URL + 'code/lock',{
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
      // throw error;
    });
};

export const codeCompile = ({req, query}) => {
  return fetch(API_BASE_URL + 'code/', {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: query.source
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
      // throw error;
    });
};

export const getCompilationStatus = ({req, query}) => {
  return fetch(API_BASE_URL + 'code/error_status', {
    method: "GET",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
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
      return error;
      // throw error;
    });
};
