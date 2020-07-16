import React from "react";
import "../../css/sidebar.css";
import { Toggle } from "./../../actions/action";
import { connect } from "react-redux";

export const SideBarToggler = (props) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          type="button"
          id="sidebarCollapse"
          className={
            props.user.role === 0
              ? "btn blue-sb-btn"
              : props.user.role === 1
              ? "btn green-sb-btn"
              : "btn yellow-sb-btn"
          }
          onClick={() => props.Toggle()}
        >
          <i className="fas fa-align-right"></i>
          <span> منوی کاربر</span>
        </button>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  Toggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarToggler);
