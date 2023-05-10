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

      dispatch(chapters(result.data.results));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const registerChapter = (data, id, sessionId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ChapterDataService.addChapter(data);

      dispatch(
        chapterSuccess(result.data.data, result.data.message, id, sessionId)
      );
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const updateChapter = (data, id, sessionId, chapterId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ChapterDataService.updChapter(chapterId, data);

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
      }
    }
  };
};

export const chapterCheck = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ChapterDataService.chapterChck(data, id);

      dispatch(chapterSuccess(result, result.data.message, id));
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};

export const deleteChapter = (id, sessionId, chapterId) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());
      const result = await ChapterDataService.delChapter(chapterId);

      dispatch(
        deleteChapterResp(result.data.message, id, sessionId, chapterId)
      );
    } catch (err) {
      if (err.response && err.response.data) {
      }
    }
  };
};
