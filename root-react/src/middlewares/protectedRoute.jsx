import React from "react";
import { Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {
  privateRoute2({ component: Component, isAuthenticated, ...rest }) {
    Component = this.props.component;
    isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}

export default ProtectedRoute;
