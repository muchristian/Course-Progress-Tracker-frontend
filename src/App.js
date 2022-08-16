import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import DashLayout from "./Components/DashLayout";
import Login from "./Components/Screen/Login";
import Home from "./Components/Screen/home";
import CourseDetail from "./Components/Screen/course/Detail";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";
import * as actions from "./store/action";
import "./css/style.css";

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheck();
  }
  render() {
    const { isOpen, isLoggedIn } = this.props;
    return (
      <div class={`right-column-fixed ${isOpen ? "sidebar-main" : ""}`}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/course-detail/:id" component={CourseDetail} />
          <PrivateRoute path="/" isLoggedIn={isLoggedIn}>
            <DashLayout />
          </PrivateRoute>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.SB.isOpen,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheck: () => dispatch(actions.authCheck()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
