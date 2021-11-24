// import {Button}
import { Component } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainContent from "./universalUi/MainContent";
// component imports below this point
import NavbarComponent from "./universalUi/NavbarComponent";
import Sidebar from "./universalUi/Sidebar";
import { connect } from "react-redux";
import { authenticateUser } from "../actions/actionCreators/auth";
class App extends Component {
  componentDidMount() {
    const tokenFromLocalStorage = localStorage.getItem("token");
    if (tokenFromLocalStorage) {
      // console.log("app did mount token is ", jwt_decode(tokenFromLocalStorage));
      const decodedToken = jwt_decode(tokenFromLocalStorage);
      let user = (({ userName, email, sub: _id }) => {
        return { userName, email, _id };
      })(decodedToken);

      this.props.dispatch(authenticateUser(user));
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <NavbarComponent />
          {/* <Sidebar /> */}
          {/* all components will be rendered inside main-content */}
          <MainContent />
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.userAuth,
  };
};
export default connect(mapStateToProps)(App);