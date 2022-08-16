import * as actionType from "./actionType";
import ClassworkDataService from "../../services/classwork.service";
import { loadingStart } from "./default";

export const classworks = (payload) => {
  return {
    type: actionType.CLASSWORK_RETURNED,
    payload,
  };
};

export const classworkSuccess = (payload, msg, id) => {
  return {
    type: actionType.CLASSWORK_SUCCESS,
    payload,
    msg,
    id,
  };
};

export const classworkFailure = (error) => {
  return {
    type: actionType.CLASSWORK_FAILURE,
    error,
  };
};

export const classworkUpdateResp = (payload, msg, id, classworkId) => {
  console.log(payload);
  return {
    type: actionType.CLASSWORK_UPDATE,
    payload,
    id,
    classworkId,
    msg,
  };
};

export const deleteClassworkResp = (msg, id, classworkId) => {
  console.log(classworkId);
  return {
    type: actionType.CLASSWORK_DELETE,
    id,
    classworkId,
    msg,
  };
};

export const getClassworks = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ClassworkDataService.getAll();
      console.log(result);
      dispatch(classworks(result.data.results));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const registerClasswork = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ClassworkDataService.addClasswork(data);
      console.log(result);
      dispatch(
        classworkSuccess(result.data.data, result.data.message, data.course)
      );
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const updateClasswork = (data, id, classworkId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ClassworkDataService.updClasswork(classworkId, data);
      console.log(result);
      dispatch(
        classworkUpdateResp(
          result.data.data,
          result.data.message,
          id,
          classworkId
        )
      );
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const deleteClasswork = (id, classworkId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ClassworkDataService.delClasswork(classworkId);
      console.log(result);
      dispatch(deleteClassworkResp(result.data.message, id, classworkId));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};
