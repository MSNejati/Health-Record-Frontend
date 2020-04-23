import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./Loading";

const CommonRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <Loading />;
      }
      return <Component {...props} />;
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CommonRoute);
