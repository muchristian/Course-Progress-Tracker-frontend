import * as actionType from "./actionType";
import AuthDataService from "../../services/auth.service";
import { loadingStart } from "./default";

export const regUserPassed = (payload, msg) => {
  return {
    type: actionType.USER_REG_PASSED,
    payload,
    msg,
  };
};

export const regUserFailed = (msg) => {
  return {
    type: actionType.USER_REG_FAILED,
    msg,
  };
};

export const returnUsers = (payload) => {
  return {
    type: actionType.RETURN_USERS,
    payload,
  };
};

export const updateUserResp = (id, payload, msg) => {
  return {
    type: actionType.UPDATE_USER,
    id,
    payload,
    msg,
  };
};

export const deleteUserResp = (id, msg) => {
  return {
    type: actionType.DELETE_USER,
    id,
    msg,
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await AuthDataService.getAll();

      dispatch(returnUsers(result.data.data));
      // localStorage.setItem("token", result.jwt);
      // dispatch(authSuccess(result.jwt));
    } catch (err) {
      if (err.response && err.response.data) {
        // dispatch(
        //   registrationFailed(err.response.data.data[0].messages[0].message)
        // );
      }
    }
  };
};

export const registerUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await AuthDataService.register(data);

      dispatch(regUserPassed(result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const updateUser = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await AuthDataService.update(data, id);

      dispatch(updateUserResp(id, result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await AuthDataService.delete(id);

      dispatch(deleteUserResp(id, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};
