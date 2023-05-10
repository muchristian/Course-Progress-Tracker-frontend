import * as actionType from "./actionType";
import FacultyDataService from "../../services/faculty.service";
import { loadingStart } from "./default";

export const faculties = (payload) => {
  return {
    type: actionType.FACULTIES_RETURNED,
    payload,
  };
};

export const facultySuccess = (payload, msg) => {
  return {
    type: actionType.FACULTY_SUCCESS,
    payload,
    msg,
  };
};

export const facultyFailure = (error) => {
  return {
    type: actionType.FACULTY_FAILURE,
    error,
  };
};

export const facultyUpdateResp = (id, payload, msg) => {
  return {
    type: actionType.FACULTY_UPDATE,
    id,
    payload,
    msg,
  };
};

export const deleteFacultyResp = (id, msg) => {
  return {
    type: actionType.FACULTY_DELETE,
    id,
    msg,
  };
};

export const getFaculties = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await FacultyDataService.getAll();

      dispatch(faculties(result.data));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const registerFaculty = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await FacultyDataService.addOne(data);

      dispatch(facultySuccess(result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const updateFaculty = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await FacultyDataService.update(data, id);

      dispatch(facultyUpdateResp(id, result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const deleteFaculty = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await FacultyDataService.delete(id);

      dispatch(deleteFacultyResp(id, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};
