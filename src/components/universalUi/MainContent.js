import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DashBoard from "../dashboard/Dashboard";
import AllProjects from "../project/AllProjects";
import Project from "../project/Project";
import SignIn from "../User/SignIn";
import SignUp from "../User/SignUp";
// import PrivateRoute from "../User/PrivateRoute";
import { connect } from "react-redux";

class MainContent extends Component {
  render() {
    let { isLoggedin } = this.props.auth;
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col lg={{ span: 10, offset: 1 }}>
              <Routes>
                <Route path="/dashboard" element={<DashBoard />}></Route>
                <Route path="/all-projects" element={<AllProjects />}></Route>
                {/* <Route path="/project" element={<PrivateRoute />}>
                  <Route path="/project" element={<Project />}></Route>
                </Route> */}
                {/* <Route
                  path="/project"
                  element={
                    <PrivateRoute isLoggedin={isLoggedin}>
                      <Project></Project>
                    </PrivateRoute> 
                   }
                ></Route> */}
                <Route
                  path="/project/id/:id"
                  element={<Project></Project>}
                ></Route>
                <Route path="/user/sign-in" element={<SignIn />}></Route>
                <Route path="/user/sign-up" element={<SignUp />}></Route>
                <Route exact path="/" element={<div>Homepage</div>}></Route>
              </Routes>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.userAuth,
  };
};
export default connect(mapStateToProps)(MainContent);
