import * as actionsTypes from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionsTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionsTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionsTypes.AUTH_FAIL,
    error: error
  };
};

export const checkAuthTimeOut = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTime * 1000);
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionsTypes.AUTH_LOGOUT
  };
};

export const auth = (email, password, isSignedUp) => {
  return dispatch => {
    dispatch(authStart());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIBIYYzq_OGmVSUnY7hXTZP_aGvXpViZM";
    if (!isSignedUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIBIYYzq_OGmVSUnY7hXTZP_aGvXpViZM";
    }
    axios
      .post(url, { email: email, password: password, returnSecureToken: true })
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirect = path => {
  return {
    type: actionsTypes.SET_AUTH_REDIRECT,
    path: path
  };
};

export const authCkeckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logOut());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate < new Date()) {
        dispatch(logOut());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        const secondsToExpire =
          (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(checkAuthTimeOut(secondsToExpire));
      }
    }
  };
};
