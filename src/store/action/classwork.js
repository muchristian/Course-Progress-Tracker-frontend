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
  return {
    type: actionType.CLASSWORK_UPDATE,
    payload,
    id,
    classworkId,
    msg,
  };
};

export const deleteClassworkResp = (msg, id, classworkId) => {
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

      dispatch(classworks(result.data.results));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const registerClasswork = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ClassworkDataService.addClasswork(data);

      dispatch(
        classworkSuccess(result.data.data, result.data.message, data.course)
      );
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const updateClasswork = (data, id, classworkId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ClassworkDataService.updClasswork(classworkId, data);

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
      }
    }
  };
};

export const deleteClasswork = (id, classworkId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ClassworkDataService.delClasswork(classworkId);

      dispatch(deleteClassworkResp(result.data.message, id, classworkId));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};
