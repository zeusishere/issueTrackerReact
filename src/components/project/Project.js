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
} from "react-bootstrap";
import AddNewIssue from "./AddNewIssue";
import AddUserToProject from "./AddUserToProject";
import RadioSelector from "./RadioSelector";
import AssignUserModal from "./AssignUserModal";

function Project(props) {
  let { id } = useParams();

  let currentProject = useSelector((state) => {
    return state.projects.currentProject;
  });
  let dispatch = useDispatch();

  if (Object.keys(currentProject).length === 0 || currentProject._id !== id) {
    console.log("current project is acada {} ", currentProject);
    dispatch(getCurrentProjectFromDatabase(id));
  }
  let issues = currentProject.issues;
  // set up state for issueStatus
  const [status, setStatus] = useState("all");
  let onClickSwitchStatus = (event) => {
    setStatus(event.target.value);
    console.log("textcontent is  ", event.target.value.trim());
  };
  if (issues) {
    switch (status) {
      case "open":
        issues = issues.filter((issue) => issue.issueStatus === "Open");
        break;
      case "closed":
        issues = issues.filter((issue) => issue.issueStatus === "Closed");
        break;
    }
  }
  return (
    <Container>
      <Row>
        <h3 className="display-5"> {currentProject.projectName}</h3>
        <hr></hr>
      </Row>
      <Row>
        Description :<br />
        {currentProject.projectDescription}
        <hr></hr>
      </Row>
      <Row>
        <h3 className="display-6">issues</h3>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <div className="text-end me-auto my-4">
            Status :{" "}
            <RadioSelector
              status={status}
              onClickSwitchStatus={onClickSwitchStatus}
            />
          </div>
          <AddUserToProject projectID={id} />

          <AddNewIssue projectID={id} />
        </Col>
        {/* <Col></Col> */}
      </Row>
      <Row>
        <Table striped bordered hover size="sm">
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
                    <td>{index + 1}</td>
                    <td>a</td>
                    <td>{issue.issueName}</td>
                    <td>
                      {/* {issue.issueAssignee.userName} */}
                      <AssignUserModal
                        assignee={issue.issueAssignee}
                        issueID={issue._id}
                      />
                    </td>
                    <td>{issue.issueStatus}</td>
                    <td>{issue.issuePriority}</td>
                    <td>{new Date(issue.createdAt).toDateString()}</td>
                    <td>{new Date(issue.issueDueDate).toDateString()}</td>
                    <td>{issue.issueAuthor && issue.issueAuthor.userName}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     auth: state.userAuth,
//     projects: state.projects,
//   };
// };connect(mapStateToProps)
export default Project;
