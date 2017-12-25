import actionTypes           from "./action_types";

export const initialState = {
  loginStatus: false,
  username: '000000000',
  leaderboardData: [],
  matchesData: [],
  code: '',
  compilationStatus: ''
};

export function codeCharacterReducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.UPDATE_USER_LOGIN_STATUS: {
      return {
        ...state,
        loginStatus: action.loginStatus,
        username: action.username
      }
    }
    case actionTypes.UPDATE_LEADERBOARD: {
      return {
        ...state,
        leaderboardData: action.data
      }
    }

    case actionTypes.UPDATE_MATCH_DATA: {
      return {
        ...state,
        matchesData: action.data
      }
    }

    case actionTypes.UPDATE_COMPILATION_STATUS: {
      return {
        ...state,
        compilationStatus: action.data
      }
    }

    default: {
      return state;
    }
  }
}
