import * as actionType from "./actionType";

export const loadingStart = () => {
  return {
    type: actionType.LOADING_START,
  };
};

export const closeAlert = () => {
  return {
    type: actionType.CLOSE_ALERT_MS,
  };
};
