import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { addCurrentProjectInDatabase } from "../../actions/actionCreators/project";

class AddNewIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      formError: "",
      issueName: "",
      issueDescription: "",
      label: "",
      issuePriority: "Normal",
      issueDueDate: "",
      //   to be made functional later
      issueAssignee: "",
    };
  }
  handleClose = () => {
    // console.log("handle close ", this.state);
    this.setState({ show: false, formError: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  updateFieldOnUserinput = (event) => {
    let fieldName = event.target.getAttribute("name");
    // console.log("fieldname ", fieldName);
    //  used es6 computed file name
    this.setState({ [fieldName]: event.target.value });
  };
  OnClickSubmitIssueDetailsToServer = () => {
    let {
      issueName,
      issueDescription,
      label,
      issuePriority,
      issueDueDate,
      issueAssignee,
    } = this.state;
    // console.log(
    //   issueName,
    //   issueDescription,
    //   label,
    //   issuePriority,
    //   issueDueDate,
    //   issueAssignee
    // );
    this.props.dispatch(
      addCurrentProjectInDatabase(
        {
          issueName,
          issueDescription,
          label,
          issuePriority,
          issueDueDate,
          issueAssignee,
        },
        this.props.projectID
      )
    );
  };
  render() {
    return (
      <React.Fragment>
        <div className="text-end me-2 my-4">
          <Button variant="outline-primary" size="sm" onClick={this.handleShow}>
            Add New Issue
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
              Add a new Issue
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
            <Form.Group className="mb-3" controlId="issueName">
              <Form.Label>Issue Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Project Name"
                name="issueName"
                onChange={this.updateFieldOnUserinput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="issueDescription">
              <Form.Label>issue Description</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "80px" }}
                placeholder="Enter Project Description"
                name="issueDescription"
                onChange={this.updateFieldOnUserinput}
              />
            </Form.Group>
            <Row>
              {/* <Col>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Issue Typedsdsd</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Issue Type"
                    name="issueType"
                  />
                </Form.Group> */}
              {/* </Col> */}
              <Col>
                <Form.Group className="mb-3" controlId="label">
                  <Form.Label>Label :</Form.Label>
                  <Form.Select name="label" disabled>
                    <option value="Open">Open</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="issuePriority">
                  <Form.Label>Priority :</Form.Label>
                  <Form.Select
                    name="issuePriority"
                    onChange={this.updateFieldOnUserinput}
                    defaultValue="Normal"
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="issueDueDate">
                  <Form.Label>Due Date :</Form.Label>
                  <Form.Control
                    type="Date"
                    name="issueDueDate"
                    onChange={this.updateFieldOnUserinput}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                onClick={this.OnClickSubmitIssueDetailsToServer}
                // disabled={isAuthenticationInProgess}
              >
                Add Issue
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.userAuth, projects: state.projects };
};
export default connect(mapStateToProps)(AddNewIssue);
