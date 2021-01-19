import { FETCH_USER_PROFILE, USER_PROFILE_FAILURE, USER_PROFILE_SUCCESFUL } from '../actions/actionTypes';

const initialProfileState = {
  user: {},
  error: null,
  success: null,
  inProgress: false,
};

export default function profile(state = initialProfileState, action) {
  //{posts:[]}
  switch (action.type) {
    case USER_PROFILE_SUCCESFUL:
      return {
        ...state,
        success: true,
        user: action.user,
        inProgress: false,
      };
    case USER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.rror,
        inProgress: false,
      };
    case FETCH_USER_PROFILE:
      return {
        ...state,
        inProgress: true,
      };

    default:
      return state;
  }
}
