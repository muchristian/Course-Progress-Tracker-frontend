import { combineReducers } from "redux";
import userReducer from "./user";
import authReducer from "./auth";
import SidebarReducer from "./UI/Sidebar";
import courseReducer from "./courses";
import roleReducer from "./role";
import facultyReducer from "./faculty";
import departmentReducer from "./department";
import attendanceReducer from "./attendance";
const rootReducers = combineReducers({
  user: userReducer,
  auth: authReducer,
  SB: SidebarReducer,
  course: courseReducer,
  role: roleReducer,
  faculty: facultyReducer,
  department: departmentReducer,
  attendance: attendanceReducer
});

export default rootReducers;
