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

export const getLatestMatchId = () => ({
  type: actionTypes.GET_LATEST_MATCH_ID
});

export const getMatchStatus = (matchId) => ({
  type: actionTypes.GET_MATCH_STATUS,
  matchId
});

export const changeLastMatchId = (matchId) => ({
  type: actionTypes.CHANGE_LAST_MATCH_ID,
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

export const changeCodeStatus = (status) => ({
  type: actionTypes.CHANGE_CODE_STATUS,
  status
});

export const changeMatchStatus = (status) => ({
  type: actionTypes.CHANGE_MATCH_STATUS,
  status
});

export const changeLastUsed = (lastUsed) => ({
  type: actionTypes.CHANGE_LAST_USED,
  lastUsed
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

export const getUnreadNotifications = () => ({
  type: actionTypes.GET_UNREAD_NOTIFICATIONS
});

export const getAllNotifications = () => ({
  type: actionTypes.GET_ALL_NOTIFICATIONS
});

export const updateAllNotifications = (notifications) => ({
  type: actionTypes.UPDATE_ALL_NOTIFICATIONS,
  notifications
});

export const updateUnreadNotifications = (notifications) => ({
  type: actionTypes.UPDATE_UNREAD_NOTIFICATIONS,
  notifications
});

export const fetchGameLog = (matchId) => ({
  type: actionTypes.FETCH_GAME_LOG,
  matchId
});

export const updateGameLog = (gameLog) => ({
  type: actionTypes.UPDATE_GAME_LOG,
  gameLog
});
