import * as actionType from "./actionType";
import jwt from "jsonwebtoken";
import AuthDataService from "../../services/auth.service";
import { loadingStart } from "./default";

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionType.LOGOUT,
  };
};

export const isLoggedIn = (role) => {
  return {
    type: actionType.ISLOGGEDIN,
    role,
  };
};

export const authUser = (user) => {
  return {
    type: actionType.AUTHUSER,
    user,
  };
};

export const authFailed = (msg) => {
  return {
    type: actionType.AUTH_FAILED,
    msg,
  };
};

export const authSuccess = (token) => {
  localStorage.setItem("token", token);
  return async (dispatch) => {
    try {
      const decoded = jwt.decode(token);
      dispatch(isLoggedIn(decoded.role));
      dispatch(authUser(decoded));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await AuthDataService.login(data);
      dispatch(authSuccess(result.data.access));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const authCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      dispatch(logout());
    } else {
      const decoded = jwt.decode(token).exp;
      if (new Date(decoded * 1000) < Date.now()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
      }
    }
  };
};
