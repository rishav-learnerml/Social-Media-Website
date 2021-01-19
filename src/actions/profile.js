import { ApiUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESFUL,
} from './actionTypes';

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESFUL,
    user,
  };
}
export function userProfileFailed(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}
export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());
    const url = ApiUrls.userProfile(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(userProfileSuccess(data.data.user));
      });
  };
}
