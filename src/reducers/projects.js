import { addCurrentProjectInDatabase } from "../actions/actionCreators/project";
import {
  ADD_ALL_PROJECTS_FROM_DATABASE_TO_STORE,
  ADD_NEW_PROJECT_FROM_DATABASE_TO_STORE,
  DELETE_PROJECT_FROM_STORE,
  GET_ALL_PROJECTS_FROM_DATABASE,
  UPDATE_CURRENT_PROJECT_IN_STORE,
  UPDATE_REQ_INFO_RETURNED_FROM_SERVER,
} from "../actions/actionTypes/project";

const initialProjectsState = {
  projects: [],
  currentProject: {},
  reqStatusReturnedFromServer: "",
  reqMessageReturnedFromServer: null,
};
export default function projects(state = initialProjectsState, action) {
  switch (action.type) {
    case ADD_ALL_PROJECTS_FROM_DATABASE_TO_STORE:
      // return [...action.projects];
      return {
        ...state,
        projects: [...action.projects],
      };
    case ADD_NEW_PROJECT_FROM_DATABASE_TO_STORE:
      // return [action.project, ...state];
      return {
        ...state,
        projects: [action.project, ...state.projects],
      };
    case UPDATE_CURRENT_PROJECT_IN_STORE:
      return {
        ...state,
        currentProject: action.project,
      };
    case UPDATE_REQ_INFO_RETURNED_FROM_SERVER:
      return {
        ...state,
        reqStatusReturnedFromServer: action.reqStatus,
        reqMessageReturnedFromServer: action.reqMessage,
      };
    case DELETE_PROJECT_FROM_STORE:
      return {
        ...state,
        projects: [
          ...state.projects.filter((project) => {
            return project._id != action.projectID;
          }),
        ],
      };
    default:
      return state;
  }
}
