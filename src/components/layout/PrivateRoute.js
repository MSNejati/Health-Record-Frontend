import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AccessDenied from "./AccessDenied";
import Loading from "./Loading";

const PrivateRoute = ({ component: Component, auth, role, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <Loading />;
      } else if (!auth.isAuthenticated) {
        return <Redirect to={"/login"} />;
      } else {
        if (role === "manager" && auth.user.role !== 0) {
          return <AccessDenied />;
        }
        if (role === "doctor" && auth.user.role !== 1) {
          return <AccessDenied />;
        }
        if (role === "patient" && auth.user.role !== 2) {
          return <AccessDenied />;
        }
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
