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
      dispatch(loadingStart());
      const result = await RoleDataService.getAll();

      dispatch(returnRoles(result.data));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const registerRole = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await RoleDataService.register(data);

      dispatch(registrationPassed(result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};
