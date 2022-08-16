import * as actionType from "./actionType";
import RoleDataService from "../../services/role.service";
import { loadingStart } from "./default";

export const registrationPassed = (payload, msg) => {
  return {
    type: actionType.ROLE_REG_PASSED,
    payload,
    msg,
  };
};

export const registrationFailed = (msg) => {
  return {
    type: actionType.ROLE_REG_FAILED,
    msg,
  };
};

export const returnRoles = (payload) => {
  return {
    type: actionType.RETURN_ROLES,
    payload,
  };
};

export const updateRole = (payload, msg) => {
  return {
    type: actionType.UPDATE_ROLE,
    payload,
    msg,
  };
};

export const getRoles = () => {
  return async (dispatch) => {
    try {
      console.log('roless')
      dispatch(loadingStart());
      const result = await RoleDataService.getAll();
      console.log(result);
      dispatch(returnRoles(result.data));
      // localStorage.setItem("token", result.jwt);
      // dispatch(authSuccess(result.jwt));
    } catch (err) {
      if (err.response && err.response.data) {
        // dispatch(
        //   registrationFailed(err.response.data.data[0].messages[0].message)
        // );
        console.log(err.response);
      }
    }
  };
};

export const registerRole = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await RoleDataService.register(data);
      console.log(result);
      dispatch(registrationPassed(result.data.data, result.data.message));
      // localStorage.setItem("token", result.jwt);
      // dispatch(authSuccess(result.jwt));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
        // dispatch(
        //   registrationFailed(err.response.data.data[0].messages[0].message)
        // );
      }
    }
  };
};
