import React, { Component } from "react";
import { Container, Row, Col, Table, Tooltip } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllProjectsFromDatabase,
  updateCurrentProjectInStore,
} from "../../actions/actionCreators/project";
import AddNewProject from "./AddNewProject";
import TooltipForMembers from "./TooltipForMembers";
import writer from "./public/writer.png";

class AllProjects extends Component {
  componentDidMount() {
    console.log("all projects");
    this.props.dispatch(getAllProjectsFromDatabase());
  }
  // style="text-overflow:ellipsis;white-space: nowrap;
  //                overflow: hidden;"
  // onClickUpdateCurrentProjectInStore = (event) => {
  //   let projectId = event.target.getAttribute("data-project-id");
  //   let projects = this.props.projects.projects;
  //   let currentProject = projects.find((project) => project._id === projectId);
  //   this.props.dispatch(updateCurrentProjectInStore(currentProject));
  // };
  render() {
    let { projects } = this.props.projects;
    let projectList = projects.map((project, index) => {
      let {
        projectName,
        projectAuthor,
        projectDescription,
        _id,
        projectMembers,
        updatedAt,
      } = project;
      console.log("individual projectMembers are  ", projectMembers);
      let updatedAtDate = new Date(updatedAt);
      return (
        <tbody key={index}>
          <tr>
            <td>{index + 1}</td>
            <td
            // data-project-id={_id}
            // onClick={this.onClickUpdateCurrentProjectInStore}
            >
              <Link
                to={`/project/id/${_id}`}
                data-project-id={_id}
                // onClick={this.onClickUpdateCurrentProjectInStore}
              >
                {projectName}
              </Link>
            </td>
            <td
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {updatedAtDate.toDateString()}
            </td>
            <td>
              <div style={{ display: "inline-block" }} className="mx-1">
                <img src={writer} style={{ width: "30px" }} />
              </div>

              {projectAuthor.userName}
            </td>
            <td>
              {projectMembers.map((user, index) => {
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
            </td>
          </tr>
        </tbody>
      );
    });
    return (
      <Container>
        <Row>
          <Col>
            <AddNewProject />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Table bordered hover responsive>
              <thead className="bg-dark text-light">
                <tr>
                  <th>#</th>
                  <th>Project</th>
                  <th>Updated At</th>
                  <th>Author</th>
                  <th>Members</th>
                </tr>
              </thead>
              {/* renders list of tables */}
              {projectList}
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.userAuth, projects: state.projects };
};
export default connect(mapStateToProps)(AllProjects);
