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
    case actionType.ATTENDANCE_RETURNED:
      return {
        ...state,
        data: action.payload,
      };
    case actionType.ATTENDANCE_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data],
        success: action.msg,
        loading: false,
      };
    case actionType.ATTENDANCE_FAILURE:
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
    default:
      return state;
  }
};

export default reducer;
