const API_BASE_URL = 'http://localhost:3001/leaderboard';

export const leaderboardGetPlayers = ({req , query}) => {
  return fetch(API_BASE_URL + '',{
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

export const leaderboardStartChallenge = ({req , query}) => {
  console.log(query);
  return fetch(API_BASE_URL + 'match/compete/player',{
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
