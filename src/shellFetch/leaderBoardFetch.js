import { API_BASE_URL } from './ApiBaseUrl';

export const leaderboardGetPlayers = ({req , query}) => {
  console.log(query.start, query.size);
  return fetch(API_BASE_URL + 'leaderboard/chunk/' + query.start + '/' + query.size,{
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
      throw error;
    });
};

export const leaderboardGetAllPlayers = ({req , query}) => {
  return fetch(API_BASE_URL + 'leaderboard',{
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
      throw error;
    });
};

export const startChallenge = ({req , query}) => {
  console.log(query);
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
      throw error;
    });
};
