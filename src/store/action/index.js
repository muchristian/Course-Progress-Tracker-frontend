export { toggleSB } from "./UI/sidebar.js";

export { closeAlert } from "./default";
export { login, logout, authCheck } from "./auth";
export { getUsers, registerUser, updateUser, deleteUser } from "./user";
export {
  getCourses,
  onGetCourseByUnrollKey,
  getCoursesByStatus,
  getStatuses,
  getCourse,
  ariseCourseState,
  getCoursesById,
  registerCourse,
  updateCourse,
  deleteCourse,
  uploadCourseFile,
  getCourseReport,
  downloadFile,
  getCoursesByRId,
  getSemesters,
  registerSemester,
  updateSemester,
} from "./courses";
export { getRoles } from "./role";
export {
  getFaculties,
  registerFaculty,
  updateFaculty,
  deleteFaculty,
} from "./faculty";
export {
  getDepartments,
  registerDepartment,
  updateDepartment,
  deleteDepartment,
} from "./department";

export {
  chapterCheck,
  registerChapter,
  updateChapter,
  deleteChapter,
} from "./chapters";

export {
  registerClasswork,
  updateClasswork,
  deleteClasswork,
} from "./classwork";

export { registerSession, updateSession, deleteSession } from "./session";

export { registerAttendance, getAttendances } from "./attendance";
