import actionTypes           from "./action_types";
import initialState          from './initialState';

export function codeCharacterReducer(state = initialState, action) {
  switch(action.type) {

    case actionTypes.UPDATE_USER_LOGIN_STATUS: {
      let nextState = {
        ...state,
        username: action.response.username ? action.response.username : state.username.toString(),
        loginStatus: action.response.loginStatus
      };
      // localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.UPDATE_LEADERBOARD: {
      let nextState = {
        ...state,
        leaderboardData: action.data.ratings
      };
      // localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.UPDATE_LOGIN_MESSAGE: {
      let nextState = {
        ...state,
        loginMessage: action.response.loginMessage
      };
      // localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.UPDATE_MATCH_ALL_DATA: {
      let nextState = {
        ...state,
        matchesData: action.data
      };
      // localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.UPDATE_CODE: {
      let nextState = {
        ...state,
        code: action.code
      };
      // localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.UPDATE_COMPILATION_STATUS: {
      let nextState = {
        ...state,
        compilationStatus: action.data
      };
      // localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.CHANGE_CODE_STATUS: {
      let nextState = {
        ...state,
        codeStatus: action.status
      };
      // localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.CHANGE_MATCH_STATUS: {
      let nextState = {
        ...state,
        matchStatus: action.status
      };
      // localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.CHANGE_LAST_USED: {
      let nextState = {
        ...state,
        lastUsed: action.lastUsed
      };
      // localStorage.setItem('codecharacter', JSON.stringify(nextState));
      return nextState;
    }

    case actionTypes.CHANGE_LAST_MATCH_ID: {
      return {
        ...state,
        lastMatchId: action.matchId
      };
    }

    case actionTypes.UPDATE_GAME_LOG: {
      console.log(action.gameLog);
      return {
        ...state,
        gameLog: action.gameLog
      }
    }

    case actionTypes.UPDATE_UNREAD_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.notifications
      }
    }

    case actionTypes.UPDATE_ALL_NOTIFICATIONS: {
      console.log(action);
      return {
        ...state,
        allNotifications: action.notifications
      }
    }

    default: {
      return state;
    }
  }
}
