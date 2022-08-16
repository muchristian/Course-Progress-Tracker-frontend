import * as actionType from "./actionType";
import SessionDataService from "../../services/session.service";
import { loadingStart } from "./default";

export const sessions = (payload) => {
  return {
    type: actionType.SESSION_RETURNED,
    payload,
  };
};

export const sessionSuccess = (payload, msg, id) => {
  return {
    type: actionType.SESSION_SUCCESS,
    payload,
    msg,
    id,
  };
};

export const sessionUpdateSuccess = (payload, msg, id, sessionId) => {
  return {
    type: actionType.SESSION_UPDATE,
    payload,
    id,
    sessionId,
    msg,
  };
};

export const sessionDeleteSuccess = (msg, id, sessionId) => {
  return {
    type: actionType.SESSION_DELETE,
    id,
    sessionId,
    msg,
  };
};

export const sessionFailure = (error) => {
  return {
    type: actionType.SESSION_FAILURE,
    error,
  };
};

export const getSessions = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await SessionDataService.getAll();
      console.log(result);
      dispatch(sessions(result.data.results));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const registerSession = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      console.log(data);
      const result = await SessionDataService.addSession(data);
      console.log(result);
      dispatch(
        sessionSuccess(result.data.data, result.data.message, data.course)
      );
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const updateSession = (data, id, sessionId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      console.log(data);
      console.log(sessionId);
      const result = await SessionDataService.updSession(sessionId, data);
      console.log(result);
      dispatch(
        sessionUpdateSuccess(
          result.data.data,
          result.data.message,
          id,
          sessionId
        )
      );
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const deleteSession = (id, sessionId) => {
  console.log(id);
  console.log(sessionId);
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await SessionDataService.delSession(sessionId);
      console.log(result);
      dispatch(sessionDeleteSuccess(result.data.message, id, sessionId));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};
