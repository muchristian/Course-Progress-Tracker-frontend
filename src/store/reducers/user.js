import * as actionType from "../action/actionType";
const initialState = {
  error: null,
  success: null,
  data: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.RETURN_USERS:
      return {
        ...state,
        data: action.payload,
      };
    case actionType.USER_REG_PASSED:
      return {
        ...state,
        data: [...state.data, action.payload],
        success: action.msg,
        loading: false,
      };
    case actionType.USER_REG_FAILED:
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
    case actionType.UPDATE_USER:
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
    case actionType.DELETE_USER:
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
