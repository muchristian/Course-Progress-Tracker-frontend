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
      console.log(result);
      dispatch(departments(result.data));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const registerDepartment = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await DepartmentDataService.addOne(data);
      console.log(result);
      dispatch(departmentSuccess(result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const updateDepartment = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await DepartmentDataService.update(data, id);
      console.log(result);
      dispatch(departmentUpdateResp(id, result.data.data, result.data.message));

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

export const deleteDepartment = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await DepartmentDataService.delete(id);
      console.log(result);
      dispatch(deleteDepartmentResp(id, result.data.message));

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
