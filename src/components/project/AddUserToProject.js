import React, { Component } from "react";
import {
  Container,
  Modal,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Table,
  Alert,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  addNewProjectFromDatabaseToStore,
  updateCurrentProjectInStore,
  updateReqInfoReturnedFromServer,
} from "../../actions/actionCreators/project";
import { APIUrls } from "../../helpers/urls";
const selected = "bg-info";
class AddUserToProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      show: false,
      usersFromDB: [],
      usersSelectedToAddToProject: [],
    };
  }
  // fn handles closing of modal on screen
  handleClose = () => {
    this.setState({
      show: false,
      formError: false,
      usersSelectedToAddToProject: [],
      usersFromDB: [],
    });
    // change reqStatus and message to default values
    this.props.dispatch(updateReqInfoReturnedFromServer("", ""));
  };
  // fn  displays modal on screen
  handleShow = () => {
    this.setState({ show: true });
  };
  // later move this to redux store
  getUsersFromDBOnClick = () => {
    let { email } = this.state;
    let jwtToken = localStorage.getItem("token");
    let url = APIUrls.getUsersFromServerDB(email);
    fetch(url, {
      headers: {
        Authorization: jwtToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.setState({ usersFromDB: data.users });
          if (data.users.length == 0)
            this.props.dispatch(
              updateReqInfoReturnedFromServer(
                false,
                "No users matching the search query were found in the database  "
              )
            );
        }
      });
  };
  // controls selection of users to be sent to db to be added to project
  onClickToggleUserSelectedToAddToProject = (event) => {
    let _id = event.target.getAttribute("data-id");
    let { usersSelectedToAddToProject } = this.state;
    let userFoundAtIndex = usersSelectedToAddToProject.findIndex(
      (user_id) => user_id === _id
    );
    if (userFoundAtIndex > -1) {
      usersSelectedToAddToProject.splice(userFoundAtIndex, 1);
      this.setState({ usersSelectedToAddToProject });
    } else {
      usersSelectedToAddToProject.push(_id);
      this.setState({ usersSelectedToAddToProject });
    }
    event.target.classList.toggle(selected);
  };
  // send users  to the server
  onClickSendUsersSelectedToAddToProjectToServer = () => {
    let url = APIUrls.sendUsersSelectedToAddToProject();
    let jwtToken = localStorage.getItem("token");
    let users = this.state.usersSelectedToAddToProject;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken,
      },
      body: JSON.stringify({ users, projectID: this.props.projectID }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.props.dispatch(updateCurrentProjectInStore(data.project));
          this.props.dispatch(
            updateReqInfoReturnedFromServer(data.success, data.message)
          );
        }
      });
  };
  // this fn updates field value from html dom to local component state
  updateFieldOnUserinput = (event) => {
    let fieldName = event.target.getAttribute("name");
    console.log("fieldname ", fieldName);
    //  used es6 computed file name
    this.setState({ [fieldName]: event.target.value });
  };
  render() {
    let { usersFromDB } = this.state;
    let { reqStatusReturnedFromServer, reqMessageReturnedFromServer } =
      this.props.reqStatusInfo;
    return (
      <React.Fragment>
        <div className="text-end me-2 my-4">
          <Button variant="outline-primary" size="sm" onClick={this.handleShow}>
            Add User To Project
          </Button>
        </div>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add a New User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="mx-5">
            {/* validation error */}
            {this.state.formError ? (
              <p className="alert alert-danger py-2 text-center">
                {this.state.formError}
              </p>
            ) : null}
            {/* status information from server displayed as updates for the req made informing status and message */}
            {reqStatusReturnedFromServer === true ? (
              <Alert variant="success" className="text-center mt-5">
                Project Successfully Added To Database{" "}
              </Alert>
            ) : reqStatusReturnedFromServer === false ? (
              <Alert variant="warning" className="text-center mt-5">
                {reqMessageReturnedFromServer}
              </Alert>
            ) : (
              ""
            )}

            <Form.Group className="mb-3" controlId="issueName">
              <Form.Label>Enter user's Email</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="email"
                  name="email"
                  onChange={this.updateFieldOnUserinput}
                />
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.getUsersFromDBOnClick}
                  // disabled={isAuthenticationInProgess}
                >
                  search
                </Button>
              </InputGroup>
              <div
                style={{ maxHeight: "150px", overflow: "auto" }}
                className="mb-3"
              >
                <Table bordered hover>
                  <tbody>
                    {usersFromDB &&
                      usersFromDB.map((user) => {
                        let { email, userName, _id } = user;
                        return (
                          <tr
                            key={_id}
                            onClick={(event) => {
                              console.log(event.target.getAttribute("data-id"));
                              this.onClickToggleUserSelectedToAddToProject(
                                event
                              );
                            }}
                          >
                            <td
                              data-id={_id}
                              data-userName={userName}
                              data-email={email}
                            >
                              {userName} ({email})
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
              {usersFromDB.length > 0 && (
                <div className="text-center">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={
                      this.onClickSendUsersSelectedToAddToProjectToServer
                    }
                    disabled={
                      this.state.usersSelectedToAddToProject.length === 0
                        ? true
                        : false
                    }
                  >
                    Add To Project
                  </Button>
                </div>
              )}
            </Form.Group>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

// export default AddUserToProject;
const mapStateToProps = (state) => {
  let { reqStatusReturnedFromServer, reqMessageReturnedFromServer } =
    state.projects;

  return {
    currentProject: state.projects.currentProject,
    reqStatusInfo: {
      reqStatusReturnedFromServer,
      reqMessageReturnedFromServer,
    },
  };
};
export default connect(mapStateToProps)(AddUserToProject);
