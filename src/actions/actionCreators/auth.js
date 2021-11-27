import SignUp from "../../components/User/SignUp";
import { APIUrls } from "../../helpers/urls";
import { getFormBody } from "../../helpers/utils";
import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATE_USER,
  LOGOUT_USER,
  CLEAR_AUTH_ERROR,
} from "../actionTypes/auth";

export function startLogIn() {
  return {
    type: LOGIN_START,
  };
}
export function loginSuccessful(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}
// send request to server
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogIn());
    const url = APIUrls.login();
    console.log(url);
    fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => {
        console.log("response-data ", response);
        return response.json();
      })
      .then((data) => {
        console.log("response-data  ", data);
        if (data.success) {
          // dispatch an action to save user
          localStorage.setItem("token", data.token);
          dispatch(loginSuccessful(data.user));
          return;
        }
        //  if login fails
        dispatch(loginFailed(data.message));
      });
  };
}

/* sign up action creators */
export function signUp(email, userName, password1, password2) {
  return (dispatch) => {
    dispatch(startSignUp());
    const url = APIUrls.signup();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ email, userName, password1, password2 }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("sign up data is after req ", data);
        if (data.success) {
          dispatch(signUpSuccessful(data.user));
          localStorage.setItem("token", data.token);

          return;
        }
        dispatch(signUpFailed(data.message));
      });
  };
}
export function startSignUp() {
  return {
    type: SIGNUP_START,
  };
}
export function signUpSuccessful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user: user,
  };
}
export function signUpFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error: errorMessage,
  };
}

// AUTHENTICATE USER I.E RESTORE USER FROM TOJEN STORED IN LOCAL STORAGE
export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}
export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
export function clearAuthError() {
  return {
    type: CLEAR_AUTH_ERROR,
  };
}
