import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ children, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: state.auth.isLoggedIn
//   };
// };

export default PrivateRoute;
