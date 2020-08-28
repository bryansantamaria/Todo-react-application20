import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  isAuthenticated = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;