import React, { Component, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import Tag from "./Tag";
import { useParams } from "react-router-dom";
import {
  getCurrentProjectFromDatabase,
  updateCurrentProjectInStore,
} from "../../actions/actionCreators/project";
import {
  Container,
  Row,
  Col,
  Table,
  thead,
  tr,
  th,
  tbody,
  Dropdown,
  Button,
  Form,
  Alert,
  FormControl,
  Badge,
} from "react-bootstrap";
import AddNewIssue from "./AddNewIssue";
import AddUserToProject from "./AddUserToProject";
import RadioSelector from "./RadioSelector";
import AssignUserModal from "./AssignUserModal";
import { Tooltip } from "react-bootstrap";
import TooltipForMembers from "./TooltipForMembers";
import StatusChangeComponent from "./StatusChangeComponent";
import IssueTypeSelector from "./public/IssueTypeSelector";

function Project(props) {
  // get id of project from url params
  let { id } = useParams();
  //  get current project from redux store
  let currentProject = useSelector((state) => {
    return state.projects.currentProject;
  });
  // let currentUser = useSelector((state) => {
  //   return state.userAuth.user;
  // });
  let dispatch = useDispatch();
  let auth = useSelector((state) => {
    return state.userAuth;
  });
  let currentUser = auth.user;
  let currentUserId = currentUser ? currentUser._id : null;

  // if current project is empty ,   fetch current project from the server
  if (Object.keys(currentProject).length === 0 || currentProject._id !== id) {
    console.log("current project is acada {} ", currentProject);
    // dispatching an action to get project and update it in the store
    dispatch(getCurrentProjectFromDatabase(id));
  }
  // projectAuthorId and current signed in user id
  const projectAuthorId = currentProject.projectAuthor
    ? currentProject.projectAuthor._id
    : null;
  console.log("current user id is @@@@@@@@@@@@", currentProject);
  let issues = currentProject.issues;
  let areIssuesPresent;
  // set up state for issueStatus . this is used to filter out issues to display
  const [status, setStatus] = useState("all");
  const [issueType, setIssueType] = useState("all");
  // changes issueStatus to display desirable issues on screen
  let onClickSwitchStatus = (event) => {
    setStatus(event.target.value);
    console.log("textcontent is  ", event.target.value.trim());
  };
  let onClickSwitchIssueType = (event) => {
    setIssueType(event.target.value);
    console.log("textcontent is ssd ", event.target.value.trim());
  };
  // issue filtering logic
  if (issues) {
    areIssuesPresent = issues.length > 0 ? true : false;
    switch (status) {
      case "open":
        issues = issues.filter((issue) => issue.issueStatus === "Open");
        break;
      case "closed":
        issues = issues.filter((issue) => issue.issueStatus === "Closed");
        break;
    }
    switch (issueType) {
      case "Security":
        issues = issues.filter((issue) => issue.label === "Security");
        break;
      case "Bug":
        issues = issues.filter((issue) => issue.label === "Bug");
        break;
      case "Task":
        issues = issues.filter((issue) => issue.label === "Task");
        break;
    }
  }
  if (auth && !auth.isLoggedin) {
    console.log(
      "singn in privRoutet $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ "
    );
    return <Navigate to="/user/sign-in" />;
  }

  return (
    <Container style={{ marginTop: "16%" }}>
      <Row className="mb-2">
        <h1 className="display-3"> {currentProject.projectName}</h1>
      </Row>
      <Row className="mb-2 ms-2">
        <hr></hr>
        Description :<br />
        {currentProject.projectDescription}
      </Row>
      <Row className="mb-2 mt-3 ms-1">
        <Col>
          <h5 className="text-muted d-inline-block text-capitalize">
            Project Author :{" "}
            {currentProject.projectAuthor &&
              currentProject.projectAuthor.userName}
          </h5>
        </Col>
        <Col className="text-end">
          <h5 className="text-muted d-inline-block">members :</h5>
          {currentProject.projectMembers &&
            currentProject.projectMembers.slice(0, 5).map((user, index) => {
              console.log("name is========", user.userName);
              return (
                <div style={{ display: "inline-block" }} className="mx-1">
                  <TooltipForMembers
                    tooltipMessage={user.userName}
                    key={index}
                  />
                </div>
              );
            })}
          <h5 className="text-muted d-inline-block">+</h5>
        </Col>
      </Row>
      <Row>
        <h3 className="display-6">issues</h3>
      </Row>
      {!areIssuesPresent && (
        <Col xs={12}>
          <Alert variant="warning" className="text-center mt-5">
            There are no Issues to view ! <br />
            Create new issues .
          </Alert>
        </Col>
      )}
      <Row>
        <Col className="d-flex justify-content-end">
          {areIssuesPresent && (
            <div className="text-end me-auto my-4">
              Status :
              <RadioSelector
                status={status}
                onClickSwitchStatus={onClickSwitchStatus}
              />
            </div>
          )}
          {areIssuesPresent && (
            <div className="text-end me-auto my-4">
              Issue Type :
              <IssueTypeSelector
                issueType={issueType}
                onClickSwitchIssueType={onClickSwitchIssueType}
              />
            </div>
          )}
          {console.log("aaaaaaaaaaaaaaaaaaaaa", currentUserId, projectAuthorId)}
          {projectAuthorId == currentUserId && (
            <AddUserToProject projectID={id} />
          )}
          <AddNewIssue projectID={id} />
        </Col>
        {/* <Col></Col> */}
      </Row>

      {areIssuesPresent && (
        <Row>
          <Table hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th className="text-center">Issue Type</th>
                <th className="text-center">Issue</th>
                <th className="text-center">Assignee</th>
                <th className="text-center">Status</th>
                <th className="text-center">Priority</th>
                <th className="text-center">Created</th>
                <th className="text-center">Due Date</th>
                <th className="text-center">Author</th>
              </tr>
            </thead>
            <tbody>
              {issues &&
                issues.map((issue, index) => {
                  return (
                    <tr key={issue._id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center ">
                        <Badge
                          pill
                          bg={
                            issue.label === "Security"
                              ? "danger"
                              : issue.label === "Bug"
                              ? "warning"
                              : "success"
                          }
                        >
                          {issue.label}
                        </Badge>
                      </td>
                      <td className="text-center">{issue.issueName}</td>
                      <td className="text-center">
                        {/* {issue.issueAssignee.userName} */}
                        <AssignUserModal
                          assignee={issue.issueAssignee}
                          issueID={issue._id}
                        />
                      </td>
                      <td className="text-center  ">
                        {/* <Form.Select size="sm" className=" ">
                          <option value={`${issue.issueStatus}`}>
                            {issue.issueStatus}
                          </option>
                          <option
                            value={
                              issue.issueStatus == "Open" ? "Closed" : "Open"
                            }
                          >
                            {issue.issueStatus == "Open" ? "Closed" : "Open"}
                          </option>
                        </Form.Select>{" "} */}
                        <StatusChangeComponent issue={issue} />
                      </td>
                      <td className="text-center">{issue.issuePriority}</td>
                      <td className="text-center">
                        {new Date(issue.createdAt).toDateString()}
                      </td>
                      <td className="text-center">
                        {new Date(issue.issueDueDate).toDateString()}
                      </td>
                      <td className="text-center text-capitalize">
                        {issue.issueAuthor && issue.issueAuthor.userName}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Row>
      )}
    </Container>
  );
}
export default Project;
