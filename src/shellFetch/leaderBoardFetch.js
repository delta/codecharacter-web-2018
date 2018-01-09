const API_BASE_URL = 'http://localhost:3001/leaderboard';

export const leaderboardGetPlayers = ({req , query}) => {
  return fetch(API_BASE_URL + '',{
    method: "GET",
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

export const leaderboardStartChallenge = ({req , query}) => {
  return fetch(API_BASE_URL + 'api/challenge',{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: query.username,
      opponent: query.opponent,
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
