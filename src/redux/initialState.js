const initialState = {
  userId: -1,
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
  codeBeingSubmitted: false,
  lastUsed: 0,
  lastMatchId: -1,
  gameLog: [],
  isFetching: false,
  ais: [],
  activeAiId: -1,
  totalUsers: 0,
  pingStatusActive: false,
  dLogs: ['','']
};

export default initialState;
