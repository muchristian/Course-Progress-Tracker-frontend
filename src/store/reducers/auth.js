import * as actionType from "../action/actionType";
const initialState = {
  error: null,
  isLoggedIn: null,
  user: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOADING_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.AUTH_FAILED:
      return {
        ...state,
        error: action.msg,
        loading: false,
      };
    case actionType.CLOSE_ALERT_MS:
      return {
        ...state,
        error: null,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        isLoggedIn: null,
      };
    case actionType.ISLOGGEDIN:
      return {
        ...state,
        isLoggedIn: action.role,
        loading: false,
      };
    case actionType.AUTHUSER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
