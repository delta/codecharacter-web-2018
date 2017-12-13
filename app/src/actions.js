import { action_types }           from "./action_types";

export function authenticateUser(username, password) {
  return {
    type: action_types.AUTHENTICATE_USER,
    username,
    password
  };
}

export function signoutUser() {
  return {
    type: action_types.SIGNOUT_USER
  }
}

export function getLeaderboard() {
  return {
    type: action_types.GET_LEADERBOARD
  }
}
