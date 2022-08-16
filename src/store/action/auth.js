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
      console.log(token)
      const decoded = jwt.decode(token);
      
      // dispatch(loadingStart());
      // const result = await AuthDataService.getProfile(token);
      // console.log(result);
      dispatch(isLoggedIn(decoded.role))
      dispatch(authUser(decoded));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
        // dispatch(authFailed(err.response.data.data[0].messages[0].message));
      }
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await AuthDataService.login(data);
      console.log(result);
      dispatch(authSuccess(result.data.access));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
        // dispatch(authFailed(err.response.data.data[0].messages[0].message));
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
      console.log(token);
      const decoded = jwt.decode(token).exp;
      if (new Date(decoded * 1000) < Date.now()) {
        console.log("ddd")
        dispatch(logout());
      } else {
        console.log("----")
        dispatch(authSuccess(token));
      }
    }
  };
};
