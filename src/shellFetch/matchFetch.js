const API_BASE_URL = 'http://localhost:3001/';

export const matchFetchAll = ({req , query}) => {
  return fetch(API_BASE_URL + 'match/get_matches',{
    method: 'GET',
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

export const matchFetchData = ({req , query}) => {
  console.log(API_BASE_URL + 'match/' + query.matchId.toString());
  return fetch(API_BASE_URL + 'match/' + query.matchId.toString(),{
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

export const challengePlayer = ({req , query}) => {
  return fetch(API_BASE_URL + 'match/compete/player/' + query.opponent, {
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

export const getMatchStatus = ({req, query}) => {
  console.log(query.matchId);
  return fetch(API_BASE_URL + 'match/match_status/' + query.matchId, {
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

export const getLatestMatchId = ({req, query}) => {
  return fetch(API_BASE_URL + 'match/get_latest_match_id', {
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

export const fetchGameLog = ({req,query}) => {
  console.log(query.matchId);
  return fetch(API_BASE_URL + 'match/' + query.matchId, {
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

export const executeCode = ({req, query}) => {
  return fetch(API_BASE_URL + 'match/compete/player/2', {
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
