import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import React, { Component } from "react";
// import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@restart/ui/esm/Button";
import { logoutUser } from "../../actions/actionCreators/auth";

class NavbarComponent extends Component {
  logOut = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logoutUser());
  };
  getProtectedLinks = (isLoggedIn) => {
    return isLoggedIn ? (
      <React.Fragment>
        {" "}
        <Nav.Link as={Link} to="/dashboard">
          DashBoard
        </Nav.Link>
        <Nav.Link as={Link} to="/all-projects">
          Projects
        </Nav.Link>
        <Nav.Link as={Link} to="/main">
          Filters
        </Nav.Link>
        <Nav.Link as={Link} to="/about">
          +
        </Nav.Link>
        <Nav.Link as={Link} to="/project/open">
          project
        </Nav.Link>
        <Nav.Link onClick={this.logOut}>Log Out</Nav.Link>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Nav.Link as={Link} to="/user/sign-in">
          sign in
        </Nav.Link>
        <Nav.Link as={Link} to="/user/sign-up">
          sign up
        </Nav.Link>
      </React.Fragment>
    );
  };

  render() {
    const { auth } = this.props;
    return (
      <div>
        {/* <About /> */}
        {/* <Router> */}
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>Issue Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>

                {this.getProtectedLinks(auth.isLoggedin)}
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* <Routes>
            <Route path="/about" element={<About />}></Route>
            <Route path="/"></Route>
          </Routes> */}
        {/* </Router> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.userAuth,
  };
};
export default connect(mapStateToProps)(NavbarComponent);