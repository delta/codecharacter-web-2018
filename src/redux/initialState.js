const initialState = {
  initialLogin: false,
  loginStatus: false,
  loginMessage: '',
  signupMessage: '',
  leaderboardData: [],
  matchesData: [],
  code: '',
  profileData: null,
  profileViewData: null,
  compilationStatus: '',
  notifications: [],
  allNotifications: [],
  codeStatus: 'IDLE',
  matchStatus: 'IDLE',
  lastUsed: 0,
  lastMatchId: -1,
  gameLog: [],
  ais: [],
  activeAiId: -1,
  totalUsers: 0,
};

export default initialState;
