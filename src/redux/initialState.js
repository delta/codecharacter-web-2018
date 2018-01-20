const initialState = {
  loginStatus: false,
  username: '000000000',
  loginMessage: '',
  leaderboardData: [],
  matchesData: [],
  code: '',
  profileData: null,
  compilationStatus: '',
  notifications: [{status: 'success', message: 'Compilation is done'},{status: 'error', message: 'You lost the match against 2'}],
  status: ''
};

export default initialState;
