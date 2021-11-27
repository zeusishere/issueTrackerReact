import React, { Component } from "react";
import { Container, Row, Col, Table, Tooltip, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";
import {
  getAllProjectsFromDatabase,
  updateCurrentProjectInStore,
} from "../../actions/actionCreators/project";
import AddNewProject from "./AddNewProject";
import TooltipForMembers from "./TooltipForMembers";
import writer from "./public/writer.png";
import man from "./public/man.png";
import PaginationComponent from "./PaginationComponent";

class AllProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 10,
      havePagesLoaded: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(getAllProjectsFromDatabase());
    this.setState((state) => {
      return {
        totalItems: this.props.projects.length,
        totalPages: Math.ceil(this.props.projects.length / state.itemsPerPage),
      };
    });
  }
  onClickSetCurrentPageInState = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };
  render() {
    let { currentPage } = this.state;
    let auth = this.props.auth;
    console.log("auth is  ", this.props.auth, auth && !auth.isLoggedin);
    let { projects } = this.props.projects;
    const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
    const totalItems = projects.length;
    const totalPages = Math.ceil(totalItems / this.state.itemsPerPage);
    let projectsOnCurrentPage = projects.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    console.log("slice   ", projectsOnCurrentPage);
    let projectList = projectsOnCurrentPage.map((project, index) => {
      // to deal with accessing properties of undefined
      if (project == undefined) return "";
      let {
        projectName,
        projectAuthor,
        projectDescription,
        _id,
        projectMembers,
        updatedAt,
      } = project;
      let updatedAtDate = new Date(updatedAt);
      return (
        <tr key={index}>
          <td className="text-center">{index + 1}</td>
          <td className="text-center">
            <Link to={`/project/id/${_id}`} data-project-id={_id}>
              {projectName}
            </Link>
          </td>
          <td className="text-center">{updatedAtDate.toDateString()}</td>
          <td className="text-center">
            <div style={{ display: "inline-block" }} className="mx-1">
              <img src={writer} style={{ width: "30px" }} />
            </div>
            {projectAuthor.userName}
          </td>
          <td>
            {projectMembers.slice(0, 5).map((user, index) => {
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
      );
    });
    if (auth && !auth.isLoggedin) {
      console.log(
        "singn in privRoutet $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ "
      );
      return <Navigate to="/user/sign-in" />;
    }
    return (
      <Container
        style={{ marginTop: "16%" }}
        className="border  border-dark rounded "
      >
        <Row>
          <h1>Projects</h1>
        </Row>
        <Row>
          {projectList.length <= 0 && (
            <Col xs={12}>
              <Alert variant="warning" className="text-center mt-5">
                There are no Projects to view ! <br />
                Create new Projects or get added to Projects of others .
              </Alert>
            </Col>
          )}
          <Col>
            <AddNewProject />
          </Col>
        </Row>
        {projectList.length > 0 && (
          <Row>
            <Col xs={12} style={{ minHeight: "440px" }}>
              <Table hover size="sm">
                <thead className="text-center">
                  <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th>Updated At</th>
                    <th>Author</th>
                    <th className="text-start">Members</th>
                  </tr>
                </thead>
                <tbody>{projectList}</tbody>
              </Table>
            </Col>
          </Row>
        )}
        {projectList.length > 0 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={this.onClickSetCurrentPageInState}
          />
        )}
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.userAuth, projects: state.projects };
};
export default connect(mapStateToProps)(AllProjects);
