import * as actionType from "./actionType";
import ChapterDataService from "../../services/chapter.service";
import { loadingStart } from "./default";

export const chapters = (payload) => {
  return {
    type: actionType.CHAPTER_RETURNED,
    payload,
  };
};

export const chapterSuccess = (payload, msg, id, sessionId) => {
  console.log(payload);
  return {
    type: actionType.CHAPTER_SUCCESS,
    payload,
    id,
    sessionId,
    msg,
  };
};

export const chapterUpdateSuccess = (
  payload,
  msg,
  id,
  sessionId,
  chapterId
) => {
  console.log(payload);
  return {
    type: actionType.CHAPTER_UPDATE,
    payload,
    id,
    sessionId,
    chapterId,
    msg,
  };
};

export const chapterFailure = (error) => {
  return {
    type: actionType.CHAPTER_FAILURE,
    error,
  };
};

export const chapterUpdateResp = (payload, id, msg) => {
  return {
    type: actionType.CHAPTER_UPDATE,
    payload,
    id,
    msg,
  };
};

export const deleteChapterResp = (msg, id, sessionId, chapterId) => {
  return {
    type: actionType.CHAPTER_DELETE,
    id,
    sessionId,
    chapterId,
    msg,
  };
};

export const getChapters = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ChapterDataService.getAll();
      console.log(result);
      dispatch(chapters(result.data.results));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const registerChapter = (data, id, sessionId) => {
  console.log(sessionId);
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ChapterDataService.addChapter(data);
      console.log(result);
      dispatch(
        chapterSuccess(result.data.data, result.data.message, id, sessionId)
      );
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const updateChapter = (data, id, sessionId, chapterId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ChapterDataService.updChapter(chapterId, data);
      console.log(result);
      dispatch(
        chapterUpdateSuccess(
          result.data.data,
          result.data.message,
          id,
          sessionId,
          chapterId
        )
      );
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const chapterCheck = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ChapterDataService.chapterChck(data, id);
      console.log(result);
      dispatch(chapterSuccess(result, result.data.message, id));
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};

export const deleteChapter = (id, sessionId, chapterId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ChapterDataService.delChapter(chapterId);
      console.log(result);
      dispatch(
        deleteChapterResp(result.data.message, id, sessionId, chapterId)
      );
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response);
      }
    }
  };
};
