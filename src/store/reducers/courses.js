import * as actionType from "../action/actionType";
const initialState = {
  data: [],
  error: null,
  success: null,
  loading: false,
  course: null,
  statuses: [],
  homeCourses: [],
  coursesReport: [],
  semesters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.COURSES_RETURNED:
      return {
        ...state,
        data: action.payload,
      };
    case actionType.COURSES_REPORT:
      return {
        ...state,
        coursesReport: action.payload,
      };
    case actionType.COURSE_RETURNED:
      return {
        ...state,
        course: state.data.filter((el) => el.id == action.id),
      };

    case actionType.ARISE_COURSE_STATE:
      return {
        ...state,
        course: null,
      };
    case actionType.COURSE_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data],
        success: action.msg,
        loading: false,
      };
    case actionType.COURSE_FAILURE:
      return {
        ...state,
        error: action.msg,
        loading: false,
      };
    case actionType.CLOSE_ALERT_MS:
      return {
        ...state,
        error: null,
        success: null,
      };
    case actionType.COURSE_STATUSES:
      return {
        ...state,
        loading: false,
        statuses: action.payload,
      };
    case actionType.COURSE_UPDATE:
      return {
        loading: false,
        data: state.data.map((dt) => {
          if (dt.id == action.id) {
            return {
              ...dt,
              ...action.payload,
            };
          } else {
            return dt;
          }
        }),
        success: action.message,
      };
    case actionType.COURSE_DELETE:
      return {
        loading: false,
        data: state.data.filter(({ id }) => id !== action.id),
        success: action.message,
      };

    case actionType.COURSES_BY_STATUS:
      return {
        ...state,
        loading: false,
        homeCourses: action.payload,
      };
    case actionType.COURSE_BY_kEY:
      return {
        ...state,
        course: state.homeCourses.filter(
          ({ enroll_key }) => enroll_key == action.key
        ),
      };
    case actionType.CHAPTER_SUCCESS:
      return {
        ...state,
        data: state.data.map((dt) => {
          if (dt.id == action.id) {
            return {
              ...dt,
              session_list: dt.session_list.map((dt1) => {
                if (dt1.id == action.sessionId) {
                  return {
                    ...dt1,
                    chapter_list: [...dt1.chapter_list, action.payload],
                  };
                }
                return dt1;
              }),
            };
          } else {
            return dt;
          }
        }),
        loading: false,
        success: action.message,
      };
    case actionType.CHAPTER_UPDATE:
      return {
        ...state,
        loading: false,
        data: state.data.map((dt) => {
          if (dt.id == action.id) {
            return {
              ...dt,
              session_list: dt.session_list.map((dt1) => {
                if (dt1.id == action.sessionId) {
                  return {
                    ...dt1,
                    chapter_list: dt1.chapter_list.map((dt2) => {
                      if (dt2.id == action.chapterId) {
                        return {
                          ...dt2,
                          ...action.payload,
                        };
                      } else {
                        return dt2;
                      }
                    }),
                  };
                }
                return dt1;
              }),
            };
          } else {
            return dt;
          }
        }),

        success: action.msg,
      };
    case actionType.CHAPTER_DELETE:
      return {
        ...state,
        loading: false,
        data: state.data.map((dt) => {
          if (dt.id == action.id) {
            return {
              ...dt,
              session_list: dt.session_list.map((dt1) => {
                if (dt1.id == action.sessionId) {
                  return {
                    ...dt1,
                    chapter_list: dt1.chapter_list.filter(
                      (dt2) => dt2.id !== action.chapterId
                    ),
                  };
                }
                return dt1;
              }),
            };
          } else {
            return dt;
          }
        }),
        success: action.msg,
      };
    case actionType.CLASSWORK_SUCCESS:
      return {
        ...state,
        data: state.data.map((dt) => {
          if (dt.id == action.id) {
            return {
              ...dt,
              classwork_list: [...dt.classwork_list, action.payload],
            };
          } else {
            return dt;
          }
        }),
        loading: false,
        success: action.msg,
      };
    case actionType.CLASSWORK_UPDATE:
      return {
        ...state,
        data: state.data.map((dt) => {
          if (dt.id == action.id) {
            return {
              ...dt,
              classwork_list: dt.classwork_list.map((dt1) => {
                if (dt1.id == action.classworkId) {
                  return {
                    ...dt1,
                    ...action.payload,
                  };
                } else {
                  return dt1;
                }
              }),
            };
          } else {
            return dt;
          }
        }),
        loading: false,
        success: action.msg,
      };
    case actionType.CLASSWORK_DELETE:
      return {
        loading: false,
        data: state.data.map((dt) => {
          if (dt.id == action.id) {
            return {
              ...dt,
              classwork_list: dt.classwork_list.filter(
                ({ id }) => id !== action.classworkId
              ),
            };
          } else {
            return dt;
          }
        }),
        loading: false,
        success: action.message,
      };
    case actionType.SESSION_SUCCESS:
      return {
        ...state,
        data: state.data.map((dt) => {
          if (dt.id == action.id) {
            return {
              ...dt,
              session_list: [...dt.session_list, action.payload],
            };
          } else {
            return dt;
          }
        }),
        loading: false,
        success: action.msg,
      };
    case actionType.SESSION_UPDATE:
      return {
        ...state,
        data: state.data.map((dt) => {
          if (dt.id == action.id) {
            return {
              ...dt,
              session_list: dt.session_list.map((dt1) => {
                if (dt1.id == action.sessionId) {
                  return {
                    ...dt1,
                    ...action.payload,
                  };
                } else {
                  return dt1;
                }
              }),
            };
          } else {
            return dt;
          }
        }),
        loading: false,
        success: action.msg,
      };
    case actionType.SESSION_DELETE:
      return {
        ...state,
        data: state.data.map((dt) => {
          if (dt.id == action.id) {
            return {
              ...dt,
              session_list: dt.session_list.filter(
                ({ id }) => id !== action.sessionId
              ),
            };
          } else {
            return dt;
          }
        }),
        loading: false,
        success: action.msg,
      };
    case actionType.SEMESTER_RETRIEVE:
      return {
        ...state,
        loading: false,
        semesters: action.payload,
        success: action.msg,
      };
    case actionType.SEMESTER_REGISTRATION:
      return {
        ...state,
        loading: false,
        semesters: [action.payload, ...state.semesters],
        success: action.msg,
      };
    default:
      return state;
  }
};

export default reducer;
