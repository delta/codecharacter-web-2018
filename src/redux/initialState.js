const initialState = {
  initialLogin: false,
  loginStatus: false,
  username: '000000000',
  loginMessage: '',
  leaderboardData: [],
  matchesData: [],
  code: '',
  profileData: null,
  compilationStatus: '',
  notifications: [],
  allNotifications: [],
  codeStatus: 'Idle',
  matchStatus: 'Idle',
  lastUsed: 0,
  lastMatchId: -1,
  gameLog: [],
  ais: [],
  activeAiId: -1,
};

export default initialState;
