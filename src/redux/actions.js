import actionTypes           from "./action_types";

export const userAuthenticate = (username, password) => ({
  type: actionTypes.USER_AUTHENTICATE,
  username,
  password
});

export const userAuthenticateCheck = (username) => ({
  type: actionTypes.USER_AUTHENTICATE_CHECK,
  username
});

export const userSignup = (emailId, username, password) => ({
  type: actionTypes.USER_SIGNUP,
  emailId,
  username,
  password
});

export const userLogout = () => ({
  type: actionTypes.USER_LOGOUT
});

export const updateLoginMessage = (response) => ({
  type: actionTypes.UPDATE_LOGIN_MESSAGE,
  response: response
});

export const updateUserLoginStatus = (response) => ({
  type: actionTypes.UPDATE_USER_LOGIN_STATUS,
  response: response
});

export const fetchLeaderboardData = () => ({
  type: actionTypes.FETCH_LEADERBOARD_DATA
});

export const updateLeaderboard = (data) => ({
  type: actionTypes.UPDATE_LEADERBOARD,
  data
});

export const startChallenge = (opponent) => ({
  type: actionTypes.START_CHALLENGE,
  opponent
});

export const getCodeStatus = () => ({
  type: actionTypes.GET_CODE_STATUS
});

export const updateMatchAllData = (data) => ({
  type: actionTypes.UPDATE_MATCH_ALL_DATA,
  data
});

export const fetchMatchAllData = () => ({
  type: actionTypes.FETCH_MATCH_ALL_DATA,
});

export const getMatchData = (matchId) => ({
  type: actionTypes.GET_MATCH_DATA,
  matchId
});

export const runCode = (code) => ({
  type: actionTypes.RUN_CODE,
  code
});

export const lockCode = (code) => ({
  type: actionTypes.LOCK_CODE,
  code
});

export const fetchCode = (code) => ({
  type: actionTypes.FETCH_CODE,
});

export const changeStatus = (status) => ({
  type: actionTypes.CHANGE_STATUS,
  status
});

export const updateCode = (code) => ({
  type: actionTypes.UPDATE_CODE,
  code
});

export const getProfileData = (username) => ({
  type: actionTypes.UPDATE_CODE,
  username
});

export const updateCompilationStatus = (data) => ({
  type: actionTypes.UPDATE_COMPILATION_STATUS,
  data
});
