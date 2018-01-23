const API_BASE_URL = 'http://localhost:3001/match';

export const getAIs = ({req , query}) => {
  return fetch(API_BASE_URL + '/get_ais',{
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

export const competeAgainstAI = ({req , query}) => {
  return fetch(API_BASE_URL + '/compete/ai/' + query.id.toString(),{
    method: "GET",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: {
      aiId: query.id
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
