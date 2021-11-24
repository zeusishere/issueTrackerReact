import { Modal, Button, Form } from "react-bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addProjectToDatabase } from "../../actions/actionCreators/project";
const formErrorInput = "Enter Valid Details";
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
  handleClose = () => {
    console.log("handle close ", this.state);
    this.setState({ show: false, formError: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  updateProjectNameOnUserInput = (event) => {
    this.setState({ projectName: event.target.value });
  };
  updateProjectDescriptionOnUserInput = (event) => {
    this.setState({ projectDescription: event.target.value });
  };
  validateFormField = (formField) => {
    return formField.length > 0;
  };
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
          //   this.props.dispatch(login(email, password));
        })()
      : this.setState({ formError: formErrorInput });
  };
  render() {
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
          {/* form fields */}
          <Modal.Body className="mx-5">
            {/* validation error */}
            {this.state.formError ? (
              <p className="alert alert-danger py-2 text-center">
                {this.state.formError}
              </p>
            ) : null}
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
  return {
    auth: state.userAuth,
  };
};
export default connect(mapStateToProps)(AddNewProject);
