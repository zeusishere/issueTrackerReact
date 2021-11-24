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

function PrivateRoute({ children, isLoggedin }) {
  console.log("PrivateRoute 111111111111", isLoggedin);
  return isLoggedin ? children : <Navigate to="/dashboard" />;
}
let MainContentComp = () => {
  return (
    <p>
      What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s, when an unknown printer took a galley of type
      and scrambled it to make a type specimen book. It has survived not only
      five centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of
      Lorem Ipsum. Why do we use it? It is a long established fact that a reader
      will be distracted by the readable content of a page when looking at its
      layout. The point of using Lorem Ipsum is that it has a more-or-less
      normal distribution of letters, as opposed to using 'Content here, content
      here', making it look like readable English. Many desktop publishing
      packages and web page editors now use Lorem Ipsum as their default model
      text, and a search for 'lorem ipsum' will uncover many web sites still in
      their infancy. Various versions have evolved over the years, sometimes by
      accident, sometimes on purpose (injected humour and the like). Where does
      it come from? Contrary to popular belief, Lorem Ipsum is not simply random
      text. It has roots in a piece of classical Latin literature from 45 BC,
      making it over 2000 years old. Richard McClintock, a Latin professor at
      Hampden-Sydney College in Virginia, looked up one of the more obscure
      Latin words, consectetur, from a Lorem Ipsum passage, and going through
      the cites of the word in classical literature, discovered the undoubtable
      source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
      Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in
      45 BC. This book is a treatise on the theory of ethics, very popular
      during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
      sit amet..", comes from a line in section 1.10.32. The standard chunk of
      Lorem Ipsum used since the 1500s is reproduced below for those interested.
      Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
      Cicero are also reproduced in their exact original form, accompanied by
      English versions from the 1914 translation by H. Rackham
    </p>
  );
};

let About = () => {
  return <h1>About page</h1>;
};
let Home = () => {
  return <h1>home</h1>;
};
class MainContent extends Component {
  render() {
    let { isLoggedin } = this.props.auth;
    console.log("main content Rerendered", this.props);

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col lg={{ span: 10, offset: 1 }}>
              <Routes>
                <Route path="/about" element={<About />}></Route>

                <Route path="/main" element={<MainContentComp />}></Route>
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
