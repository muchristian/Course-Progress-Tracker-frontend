import * as actionType from "./actionType";
import CourseDataService from "../../services/course.service";
import { loadingStart } from "./default";
import SemesterService from "../../services/semester.service";

export const courses = (payload) => {
  return {
    type: actionType.COURSES_RETURNED,
    payload,
  };
};

export const ariseCourseState = () => {
  return {
    type: actionType.ARISE_COURSE_STATE,
  };
};

export const getCourse = (id) => {
  return {
    type: actionType.COURSE_RETURNED,
    id,
  };
};

export const coursesReport = (payload) => {
  return {
    type: actionType.COURSES_REPORT,
    payload,
  };
};

export const coursesByStatus = (payload) => {
  return {
    type: actionType.COURSES_BY_STATUS,
    payload,
  };
};

export const onGetCourseByUnrollKey = (key) => {
  return {
    type: actionType.COURSE_BY_kEY,
    key,
  };
};

export const courseSuccess = (payload, msg) => {
  return {
    type: actionType.COURSE_SUCCESS,
    payload,
    msg,
  };
};

export const courseFailure = (error) => {
  return {
    type: actionType.COURSE_FAILURE,
    error,
  };
};

export const updateCourseResp = (id, payload, msg) => {
  return {
    type: actionType.COURSE_UPDATE,
    payload,
    id,
    msg,
  };
};

export const deleteCourseResp = (id, msg) => {
  return {
    type: actionType.COURSE_DELETE,
    id,
    msg,
  };
};

export const courseStatuses = (payload) => {
  return {
    type: actionType.COURSE_STATUSES,
    payload,
  };
};

export const semesterRegSuccess = (msg, payload) => {
  return {
    type: actionType.SEMESTER_REGISTRATION,
    payload,
    msg,
  };
};

export const semesterUpdateSuccess = (msg, id, payload) => {
  return {
    type: actionType.SEMESTER_UPDATE,
    payload,
    id,
    msg,
  };
};

export const semesterRetrieve = (msg, payload) => {
  return {
    type: actionType.SEMESTER_RETRIEVE,
    payload,
    msg,
  };
};

export const getCourses = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await CourseDataService.getAll();
      dispatch(courses(result.data.results));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const getCourseReport = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await CourseDataService.getReport(data);

      dispatch(coursesReport(result.data.data));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const getCoursesByStatus = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await CourseDataService.getAllByStatus(id);

      dispatch(coursesByStatus(result.data.data));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const getCoursesById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await CourseDataService.getAllById(id);

      dispatch(courses(result.data));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const getCoursesByRId = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await CourseDataService.getAllByRId(id);

      dispatch(courses(result.data));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const registerCourse = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await CourseDataService.addOne(data);

      dispatch(courseSuccess(result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const updateCourse = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await CourseDataService.update(id, data);

      dispatch(updateCourseResp(id, result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const uploadCourseFile = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await CourseDataService.update(id, data);

      dispatch(updateCourseResp(id, result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const downloadFile = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await CourseDataService.download(id);
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `file.${
          result.data.type
            .split("/")
            [result.data.type.split("/").length - 1].split(".")[1]
        }`
      ); //or any other extension
      document.body.appendChild(link);
      link.click();
      // dispatch(updateCourseResp(id, result.data.data, result.data.message));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const deleteCourse = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await CourseDataService.delete(id);

      dispatch(deleteCourseResp(id, result.data.message));

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

export const getStatuses = (id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await CourseDataService.getCourseStatus();

      dispatch(courseStatuses(result.data));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const getSemesters = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await SemesterService.getAll();

      dispatch(semesterRetrieve(result.data.message, result.data.data));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const registerSemester = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await SemesterService.addSemester(data);

      dispatch(semesterRegSuccess(result.data.message, result.data.data));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const updateSemester = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await SemesterService.updSemester(id, data);

      dispatch(
        semesterUpdateSuccess(result.data.message, id, result.data.data)
      );
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};
