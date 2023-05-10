import * as actionType from "../action/actionType";
const initialState = {
  data: [],
  error: null,
  success: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.FACULTIES_RETURNED:
      return {
        ...state,
        data: action.payload,
      };
    case actionType.FACULTY_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data],
        success: action.msg,
        loading: false,
      };
    case actionType.FACULTY_FAILURE:
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
    case actionType.FACULTY_UPDATE:
      return {
        loading: false,
        data: state.data.map((dt) => {
          if (dt.id === action.payload.id) {
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
    case actionType.FACULTY_DELETE:
      return {
        loading: false,
        data: state.data.filter(({ id }) => id !== action.id),
        success: action.message,
      };
    default:
      return state;
  }
};

export default reducer;
