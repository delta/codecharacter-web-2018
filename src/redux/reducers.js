import actionTypes           from "./action_types";
import initialState          from './initialState';
import { changeCodeBeingSubmitted } from './actions';

export function codeCharacterReducer(state = initialState, action) {
  // console.log(action);
  switch(action.type) {
    case actionTypes.UPDATE_USER_LOGIN_STATUS: {
      return {
        ...state,
        username: action.response.username ? action.response.username : state.username.toString(),
        loginStatus: action.response.loginStatus,
      };
    }

    case actionTypes.UPDATE_USER_ID: {
      return {
        ...state,
        userId: action.userId.userId,
        initialLogin: (!action.userId.initialLogin)
      }
    }

    case actionTypes.UPDATE_LEADERBOARD: {
      return {
        ...state,
        leaderboardData: action.data
      };
    }

    case actionTypes.UPDATE_LOGIN_MESSAGE: {
      return {
        ...state,
        loginMessage: action.response.loginMessage
      };
    }

    case actionTypes.UPDATE_SIGNUP_MESSAGE: {
      return {
        ...state,
        signupMessage: action.response.message
      };
    }

    case actionTypes.UPDATE_MATCH_ALL_DATA: {
      return {
        ...state,
        matchesData: action.data
      };
    }

    case actionTypes.UPDATE_CODE: {
      return {
        ...state,
        code: action.code
      };
    }

    case actionTypes.UPDATE_COMPILATION_STATUS: {
      // console.log(action);
      return {
        ...state,
        compilationStatus: state.compilationStatus + action.data
      };
    }

    case actionTypes.CHANGE_CODE_STATUS: {
      return {
        ...state,
        codeStatus: (!action.status || action.status===200)?'IDLE':action.status
      };
    }

    case actionTypes.CHANGE_MATCH_STATUS: {
      return {
        ...state,
        matchStatus: (action.status===200)?'Idle':action.status
      };
    }

    case actionTypes.CHANGE_LAST_USED: {
      return {
        ...state,
        lastUsed: action.lastUsed
      };
    }

    case actionTypes.CHANGE_LAST_MATCH_ID: {
      return {
        ...state,
        lastMatchId: action.matchId
      };
    }

    case actionTypes.UPDATE_GAME_LOG: {
      return {
        ...state,
        gameLog: action.gameLog
      }
    }

    case actionTypes.UPDATE_UNREAD_NOTIFICATIONS: {
      let notifications = action.notifications;
      for(let i=0; i < notifications.length; i++) {
        if(notifications[i].message === 'TypeError: Failed to fetch'
          || notifications[i].message === 'Failed to fetch') {
          notifications[i].type = 'Network Error';
          notifications[i].message = 'Please check your network connection';
        }
        else if (notifications[i].message.toLowerCase().indexOf('unexpected token') !== -1) {
          notifications[i].type = 'Server Error';
          notifications[i].message = 'The server is under maintenance, please ' +
            'cooperate with us meanwhile. All your pending matches will be executed after the server' +
            ' is live';
        }
      }
      return {
        ...state,
        notifications: notifications
      }
    }

    case actionTypes.UPDATE_ALL_NOTIFICATIONS: {
      return {
        ...state,
        allNotifications: action.notifications
      }
    }

    case actionTypes.UPDATE_AIS: {
      return {
        ...state,
        ais: action.ais
      }
    }

    case actionTypes.CHANGE_AI_ID: {
      return {
        ...state,
        activeAiId: action.id
      }
    }

    case actionTypes.CLEAR_COMPILATION_STATUS: {
      return {
        ...state,
        compilationStatus: ''
      }
    }

    case actionTypes.UPDATE_USERS_LENGTH: {
      return {
        ...state,
        totalUsers: action.length
      }
    }

    case actionTypes.UPDATE_PROFILE_DATA: {
      return {
        ...state,
        profileData: action.data
      }
    }

    case actionTypes.UPDATE_PROFILE_VIEW_DATA: {
      return {
        ...state,
        profileViewData: action.data
      }
    }

    case actionTypes.CLEAR_STATE: {
      return {
        ...initialState,
        isFetching: state.isFetching,
        isGameFetching: state.isGameFetching,
        // codePreferences: state.codePreferences
      }
    }

    case actionTypes.UPDATE_GAME_DLOGS: {
      return {
        ...state,
        dLogs: [action.log1, action.log2]
      }
    }

    case actionTypes.CHANGE_CODE_BEING_SUBMITTED: {
      return {
        ...state,
        codeBeingSubmitted: action.codeBeingSubmitted
      }
    }

    case actionTypes.CHANGE_PING_STATUS_ACTIVE: {
      return {
        ...state,
        pingStatusActive: action.pingStatusActive
      }
    }

    case actionTypes.CHANGE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }

    case actionTypes.CHANGE_IS_GAME_FETCHING: {
      return {
        ...state,
        isGameFetching: action.isGameFetching
      }
    }

    case actionTypes.CHANGE_FIRST_MOUNT: {
      return {
        ...state,
        firstMount: action.firstMount
      }
    }

    case actionTypes.CHANGE_CODE_PREFERENCES: {
      return {
        ...state,
        codePreferences: action.preferences
      }
    }

    case "persist/REHYDRATE": {
      return { ...state, ...action.payload }
    }

    default: {
      return state;
    }
  }
}
