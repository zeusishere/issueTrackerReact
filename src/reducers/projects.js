import {
  ADD_ALL_PROJECTS_FROM_DATABASE_TO_STORE,
  ADD_NEW_PROJECT_FROM_DATABASE_TO_STORE,
  GET_ALL_PROJECTS_FROM_DATABASE,
  UPDATE_CURRENT_PROJECT_IN_STORE,
} from "../actions/actionTypes/project";

const initialProjectsState = {
  projects: [],
  currentProject: {
    //   createdAt: "",
    //   label: [],
    //   projectAuthor: "",
    //   projectDescription: "",
    //   projectMembers: [],
    //   projectName: "",
    //   updatedAt: "",
    //   __v: 0,
    //   _id: "",
  },
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
    default:
      return state;
  }
}
