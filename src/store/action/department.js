import * as actionType from "./actionType";
import DepartmentDataService from "../../services/department.service";
import { loadingStart } from "./default";

export const departments = (payload) => {
  return {
    type: actionType.DEPARTMENTS_RETURNED,
    payload,
  };
};

export const departmentSuccess = (payload, msg) => {
  return {
    type: actionType.DEPARTMENT_SUCCESS,
    payload,
    msg,
  };
};

export const departmentFailure = (error) => {
  return {
    type: actionType.DEPARTMENT_FAILURE,
    error,
  };
};

export const departmentUpdateResp = (id, payload, msg) => {
  return {
    type: actionType.DEPARTMENT_UPDATE,
    id,
    payload,
    msg,
  };
};

export const deleteDepartmentResp = (id, msg) => {
  return {
    type: actionType.DEPARTMENT_DELETE,
    id,
    msg,
  };
};

export const getDepartments = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await DepartmentDataService.getAll();

      dispatch(departments(result.data));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const registerDepartment = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await DepartmentDataService.addOne(data);

      dispatch(departmentSuccess(result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const updateDepartment = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await DepartmentDataService.update(data, id);

      dispatch(departmentUpdateResp(id, result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const deleteDepartment = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await DepartmentDataService.delete(id);

      dispatch(deleteDepartmentResp(id, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};
