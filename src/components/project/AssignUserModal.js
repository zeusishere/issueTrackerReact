import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { updateIssueInDatabase } from "../../actions/actionCreators/project";

class AssignUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      newIssueAssignee: "",
    };
  }
  handleClose = () => {
    console.log("handle close ", this.state);
    this.setState({
      show: false,
      formError: false,
      usersSelectedToAddToProject: [],
      usersFromDB: [],
    });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  updateNewIssueAssigneeOnChange = (event) => {
    this.setState({ newIssueAssignee: event.target.value });
  };
  //   start here
  onSubmitUpdateIssueOnServer = () => {
    console.log(" this.props.IssueID ", this.props.issueID);
    this.props.dispatch(
      updateIssueInDatabase(this.state.newIssueAssignee, this.props.issueID)
    );
  };
  render() {
    console.log("props are ", this.state);
    let { projectMembers } = this.props.currentProject;
    let { assignee } = this.props;
    return (
      <React.Fragment>
        <div variant="outline-primary" size="sm" onClick={this.handleShow}>
          {" "}
          {this.props.assignee ? this.props.assignee.userName : "Assign User"}
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
              Assign a User
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
            Currently assigned to : {assignee ? assignee.userName : " None"}{" "}
            <Form.Select onChange={this.updateNewIssueAssigneeOnChange}>
              {projectMembers.map((user) => {
                return <option value={user._id}> {user.userName} </option>;
              })}
            </Form.Select>
            <div className="text-center my-2">
              <Button
                disabled={this.state.newIssueAssignee === "" ? true : false}
                onClick={this.onSubmitUpdateIssueOnServer}
              >
                Assign
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return { currentProject: state.projects.currentProject };
};

export default connect(mapStateToProps)(AssignUserModal);
