import { Modal, Button, Form, Alert } from "react-bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addProjectToDatabase,
  updateReqInfoReturnedFromServer,
} from "../../actions/actionCreators/project";
import { UPDATE_REQ_INFO_RETURNED_FROM_SERVER } from "../../actions/actionTypes/project";
const formErrorInput = "Please Enter Valid Project Details";
class AddNewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      projectName: "",
      projectDescription: "",
      formError: false,
    };
  }
  // fn handles closing of modal on screen
  handleClose = () => {
    console.log("handle close ", this.state);
    this.setState({ show: false, formError: false });
    this.props.dispatch(updateReqInfoReturnedFromServer("", ""));
  };
  // fn  displays modal on screen
  handleShow = () => {
    this.setState({ show: true });
  };
  // this fn updates field value from html dom to local component state
  updateProjectNameOnUserInput = (event) => {
    this.setState({ projectName: event.target.value });
  };
  updateProjectDescriptionOnUserInput = (event) => {
    this.setState({ projectDescription: event.target.value });
  };
  // the fn prevents empty data from being submitted to the server
  validateFormField = (formField) => {
    return formField.length > 0;
  };
  // submits form to server
  submitForm = (event) => {
    event.preventDefault();
    const { projectName, projectDescription } = this.state;
    const areProjectNameAndProjectDescriptionValidated =
      this.validateFormField(projectName) &&
      this.validateFormField(projectDescription);
    areProjectNameAndProjectDescriptionValidated
      ? (() => {
          this.props.dispatch(
            addProjectToDatabase({ projectName, projectDescription })
          );
          this.setState({ formError: false });
        })()
      : this.setState({ formError: formErrorInput });
  };
  render() {
    // result of request send to the server ; to be displayed to user as updates
    let { reqStatusReturnedFromServer, reqMessageReturnedFromServer } =
      this.props.reqStatusInfo;
    return (
      <React.Fragment>
        <div className="text-end me-2 my-4">
          <Button variant="outline-primary" size="sm" onClick={this.handleShow}>
            Add New Project
          </Button>
        </div>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add a new Project
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="mx-5">
            {/* validation error from local component state*/}
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
                There was an error while adding Project. Try again
              </Alert>
            ) : (
              ""
            )}

            <h4>Project Details</h4>
            <Form.Group className="mb-3" controlId="projectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Project Name"
                name="projectName"
                onChange={this.updateProjectNameOnUserInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "80px" }}
                placeholder="Enter Project Description"
                name="projectDescription"
                onChange={this.updateProjectDescriptionOnUserInput}
              />
            </Form.Group>
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                onClick={this.submitForm}
                // disabled={isAuthenticationInProgess}
              >
                Add Project
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  let { reqStatusReturnedFromServer, reqMessageReturnedFromServer } =
    state.projects;
  return {
    auth: state.userAuth,
    reqStatusInfo: {
      reqStatusReturnedFromServer,
      reqMessageReturnedFromServer,
    },
  };
};
export default connect(mapStateToProps)(AddNewProject);
