const API_ROOT = "http://localhost:8000";
export const APIUrls = {
  login: () => `${API_ROOT}/user/sign-in`,
  signup: () => `${API_ROOT}/user/sign-up`,
  addProjectToServerDB: () => `${API_ROOT}/project/add-project`,
  getAllProjectsFromServerDB: () => ` ${API_ROOT}/project/all-projects`,
  getCurrentProjectFromServerDB: (projectID) =>
    `${API_ROOT}/project/get-project/?projectID=${projectID}`,
  // get users in add new user component
  getUsersFromServerDB: (email) => {
    return `${API_ROOT}/user/get-users/?email=${email}`;
  },
  sendUsersSelectedToAddToProject: () => {
    return `${API_ROOT}/project/add-users`;
  },
  sendIssueToAddToProject: () => {
    return `${API_ROOT}/issue/add-issue`;
  },
  updateAssigneeOnIssue: () => {
    return `${API_ROOT}/issue/update-issue-assignee`;
  },
};
