import { API_BASE_URL } from '../config/config';

export const leaderboardGetPlayers = ({req , query}) => {
  return fetch(API_BASE_URL + 'leaderboard/chunk/' + query.start + '/' + (query.start + query.size),{
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

export const leaderboardGetAllPlayers = ({req , query}) => {
  return fetch(API_BASE_URL + 'leaderboard/',{
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

export const startChallenge = ({req , query}) => {
  return fetch(API_BASE_URL + 'leaderboard/match/compete/player',{
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: query.username,
      competetorId: query.opponent,
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

export const searchUser = ({req, query}) => {
  return fetch(API_BASE_URL + 'leaderboard/search/' + query.pattern + '/' + query.size,{
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
