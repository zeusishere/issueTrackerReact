import React, { useState } from "react";
import { Form } from "react-bootstrap";
function StatusChangeComponent(props) {
  let issue = props.issue;
  const [isMouseOnStatus, setMouseStatus] = useState(false);
  let onMouseEnterSetIsMouseOverToTrue = () => {
    setMouseStatus(true);
  };
  let onMouseExitSetIsMouseOverToFalse = () => {
    setMouseStatus(false);
  };
  return (
    <div
      className=""
      onMouseEnter={onMouseEnterSetIsMouseOverToTrue}
      onMouseOut={onMouseExitSetIsMouseOverToFalse}
    >
      {!isMouseOnStatus ? (
        <Form.Select size="sm" disabled>
          <option value={`${issue.issueStatus}`}>{issue.issueStatus}</option>
          <option value={issue.issueStatus == "Open" ? "Closed" : "Open"}>
            {issue.issueStatus == "Open" ? "Closed" : "Open"}
          </option>
        </Form.Select>
      ) : (
        <Form.Select size="sm">
          <option value={`${issue.issueStatus}`}>{issue.issueStatus}</option>
          <option value={issue.issueStatus == "Open" ? "Closed" : "Open"}>
            {issue.issueStatus == "Open" ? "Closed" : "Open"}
          </option>
        </Form.Select>
      )}
    </div>
  );
}

export default StatusChangeComponent;
