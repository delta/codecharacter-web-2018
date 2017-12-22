import actionTypes           from "./action_types";

export const initialState = {
  loginStatus: false,
  username: "000000000",
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
    default: {
      return state;
    }
  }
}
