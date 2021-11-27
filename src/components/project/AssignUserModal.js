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
      isMouseOver: false,
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
  onMouseEnterSetIsMouseOverToTrue = () => {
    this.setState({ isMouseOver: true });
  };
  onMouseExitSetIsMouseOverToFalse = () => {
    this.setState({ isMouseOver: false });
  };
  render() {
    console.log("props are ", this.state);
    let { projectMembers } = this.props.currentProject;
    let { assignee } = this.props;
    return (
      <React.Fragment>
        <div
          variant="outline-primary"
          size="sm"
          className="text-capitalize"
          onClick={this.handleShow}
          onMouseEnter={this.onMouseEnterSetIsMouseOverToTrue}
          onMouseOut={this.onMouseExitSetIsMouseOverToFalse}
        >
          {/* <span
            className={
              this.state.isMouseOver ? "bg-secondary text-light " : " "
            }
          > */}
          <div
            className={
              this.state.isMouseOver
                ? "bg-dark bg-gradient text-light rounded-pill "
                : "rounded-pill"
            }
          >
            {" "}
            {this.props.assignee
              ? this.props.assignee.userName
              : "Assign User"}{" "}
            <div
              className={
                this.state.isMouseOver ? "d-inline-block  " : " d-inline-block"
              }
              style={{
                visibility: `${this.state.isMouseOver ? "visible" : "hidden"}`,
              }}
            >
              ^
            </div>
          </div>
          {/* {this.props.assignee ? this.props.assignee.userName : "Assign User"}{" "} */}
          {/* </span> */}

          {/* {this.state.isMouseOver ? "^" : ""} */}
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
            <p className="text-capitalize">
              Currently assigned to : {assignee ? assignee.userName : " None"}
            </p>
            <Form.Select onChange={this.updateNewIssueAssigneeOnChange}>
              {projectMembers.map((user) => {
                return <option value={user._id}> {user.userName} </option>;
              })}
            </Form.Select>
            <div className="text-center my-2">
              <Button onClick={this.onSubmitUpdateIssueOnServer}>Assign</Button>
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
