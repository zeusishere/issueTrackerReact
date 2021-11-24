import { combineReducers } from "redux";
import userAuth from "./auth";
import projects from "./projects";
export default combineReducers({
  userAuth,
  projects,
});
