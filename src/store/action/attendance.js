import * as actionType from "./actionType";
import AttendanceDataService from "../../services/attendance.service";
import { loadingStart } from "./default";

export const attendances = (payload) => {
  return {
    type: actionType.ATTENDANCE_RETURNED,
    payload,
  };
};

export const attendanceSuccess = (payload, msg) => {
  return {
    type: actionType.ATTENDANCE_SUCCESS,
    payload,
    msg,
  };
};

export const attendanceFailure = (error) => {
  return {
    type: actionType.ATTENDANCE_FAILURE,
    error,
  };
};

export const getAttendances = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await AttendanceDataService.getAll();

      dispatch(attendances(result.data.results));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const registerAttendance = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await AttendanceDataService.addOne(data);

      dispatch(attendanceSuccess(result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};
