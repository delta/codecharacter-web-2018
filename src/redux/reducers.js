import actionTypes           from "./action_types";
import initialState          from './initialState';

export function codeCharacterReducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.UPDATE_USER_LOGIN_STATUS: {
      console.log(action);
      return {
        ...state,
        username: action.response.username ? action.response.username : state.username.toString(),
        loginStatus: action.response.loginStatus,
      };
    }

    case actionTypes.UPDATE_USER_ID: {
      console.log(action);
      return {
        ...state,
        userId: action.userId.userId,
        initialLogin: !action.userId.initialLogin
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
        compilationStatus: state.compilationStatus + action.data.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
      };
    }

    case actionTypes.CHANGE_CODE_STATUS: {
      return {
        ...state,
        codeStatus: (action.status===200)?'Idle':action.status
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
      return {
        ...state,
        notifications: action.notifications
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
      console.log(action.data);
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
        initialState
      }
    }

    case actionTypes.UPDATE_GAME_DLOGS: {
      return {
        ...state,
        dLogs: [action.log1, action.log2]
      }
    }

    case actionTypes.CHANGE_PING_STATUS_ACTIVE: {
      console.log(action);
      return {
        ...state,
        pingStatusActive: action.pingStatusActive
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
