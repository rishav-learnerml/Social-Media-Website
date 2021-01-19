import { ApiUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';
import {
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESFUL,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from './actionTypes';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = ApiUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          //dispatch action to save user
          localStorage.setItem('token', data.data.token);
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

//authenticate
export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}
/****************...........START SIGNUP..............******************************/

export function signup(email, password, confirmPassword, name) {
  return (dispatch) => {
    const url = ApiUrls.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Our API is written in "urlencoded" if our API is written in JSON then you don't need to specify 'Content-Type' (you can specify but not compulsory).
      },
      body: getFormBody({
        email,
        password,
        confirm_password: confirmPassword,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          // Dispatch action to server
          localStorage.setItem('token', data.data.token); // persistance the data into local storage.
          dispatch(signupSuccessful(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}

export function signupSuccessful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}
export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
export function editUserSuccesful(user) {
  return {
    type: EDIT_USER_SUCCESFUL,
    user,
  };
}
export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}

export function editUser(name, password, confirmPassword, userId){
  return (dispatch)=>{
    const url = ApiUrls.editProfile();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
    .then((res)=> res.json())
    .then(data =>{
      console.log('data',data);
      if(data.success){
        dispatch(editUserSuccesful(data.data.user));
        if(data.data.token){
          localStorage.setItem('token',data.data.token);
        }
        return;
      }
      dispatch(editUserFailed(data.message));
    })
  }
}


