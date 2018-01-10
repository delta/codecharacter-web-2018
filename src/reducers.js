import actionTypes           from "./action_types";

export const initialState = {
  loginStatus: false,
  username: '000000000',
  loginMessage: '',
  leaderboardData: [],
  matchesData: [],
  code: '',
  profileData: null,
  compilationStatus: ''
};

export function codeCharacterReducer(state = initialState, action) {
  switch(action.type) {

    case actionTypes.UPDATE_USER_LOGIN_STATUS: {
      let nextState = {
        ...state,
        username: action.response.username ? action.response.username.toString() : state.username.toString(),
        loginStatus: action.response.loginStatus
      };
      localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.UPDATE_LEADERBOARD: {
      let nextState = {
        ...state,
        leaderboardData: action.data.ratings
      };
      localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.UPDATE_LOGIN_MESSAGE: {
      let nextState = {
        ...state,
        loginMessage: action.response.loginMessage
      };
      localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.UPDATE_MATCH_DATA: {
      let nextState = {
        ...state,
        matchesData: action.data
      };
      localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.UPDATE_CODE: {
      let nextState = {
        ...state,
        code: action.code
      };
      console.log(action);
      localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.UPDATE_COMPILATION_STATUS: {
      let nextState = {
        ...state,
        compilationStatus: action.data
      };
      localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    default: {
      return state;
    }
  }
}
