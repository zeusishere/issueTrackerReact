import { APIUrls } from "../../helpers/urls";
import {
  ADD_ALL_PROJECTS_FROM_DATABASE_TO_STORE,
  ADD_NEW_PROJECT_FROM_DATABASE_TO_STORE,
  ADD_PROJECT_TO_DATABASE,
  UPDATE_CURRENT_PROJECT_IN_STORE,
  ADD_ISSUE_TO_PROJECT_IN_DATABASE,
  UPDATE_REQ_INFO_RETURNED_FROM_SERVER,
} from "../actionTypes/project";
import { getFormBody } from "../../helpers/utils";

export function getAllProjectsFromDatabase() {
  return (dispatch) => {
    let url = APIUrls.getAllProjectsFromServerDB();
    let jwtToken = localStorage.getItem("token");
    fetch(url, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("all projects ", data);
        dispatch(addAllProjectsFromDatabaseToStore(data.projects));
      });
  };
}
export function addAllProjectsFromDatabaseToStore(projects) {
  return {
    type: ADD_ALL_PROJECTS_FROM_DATABASE_TO_STORE,
    projects,
  };
}

// projectAuthor has not been provided to the fn as on the server we will get it from token
export function addProjectToDatabase({ projectName, projectDescription }) {
  return (dispatch) => {
    let url = APIUrls.addProjectToServerDB();
    let jwtToken = localStorage.getItem("token");
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ projectName, projectDescription }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("addProjectTodatabase  #####", data);
        dispatch(updateReqInfoReturnedFromServer(data.success, data.message));
        if (data.success)
          dispatch(addNewProjectFromDatabaseToStore(data.project));
      });
  };
}
export function addNewProjectFromDatabaseToStore(project) {
  return {
    type: ADD_NEW_PROJECT_FROM_DATABASE_TO_STORE,
    project,
  };
}

// set current project in projects reducer
export function updateCurrentProjectInStore(project) {
  return {
    type: UPDATE_CURRENT_PROJECT_IN_STORE,
    project,
  };
  // delete above fn
}
export function getCurrentProjectFromDatabase(projectID) {
  return function (dispatch) {
    const url = APIUrls.getCurrentProjectFromServerDB(projectID);
    let jwtToken = localStorage.getItem("token");
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("current project data is ------  ", data);
        if (data.success) dispatch(updateCurrentProjectInStore(data.project));
      });
  };
  // console.log("uuuurl is ", url);
  return {
    type: "ab",
  };
}

//  actions related to issues

// THIS FN MIGHT HAVE BEEN  NAMED WRONG
export function addCurrentProjectInDatabase(issue, projectID) {
  return (dispatch) => {
    let url = APIUrls.sendIssueToAddToProject();
    let jwtToken = localStorage.getItem("token");
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ ...issue, projectID }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(updateReqInfoReturnedFromServer(data.success, data.message));
        if (data.success) {
          if (data.success) dispatch(updateCurrentProjectInStore(data.project));
        }
      });
  };
}

// update issue document on the server
export function updateIssueInDatabase(issueAssignee, issueID) {
  return (dispatch) => {
    let jwtToken = localStorage.getItem("token");
    let url = APIUrls.updateAssigneeOnIssue();
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ issueAssignee, issueID }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data is", data);
        dispatch(updateCurrentProjectInStore(data.project));
      });
  };
}
// action CREATOR to update  reqStatusReturnedFromServer: "", reqMessageReturnedFromServer: null,

export function updateReqInfoReturnedFromServer(
  reqStatus = false,
  reqMessage = "dummy message"
) {
  return {
    type: UPDATE_REQ_INFO_RETURNED_FROM_SERVER,
    reqStatus,
    reqMessage,
  };
}
