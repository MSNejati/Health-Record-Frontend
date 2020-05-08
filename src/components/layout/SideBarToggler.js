import React from "react";
import { Toggle } from "./../../actions/action";
import { connect } from "react-redux";

export const SideBarToggler = (props) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          type="button"
          id="sidebarCollapse"
          className="btn btn-info sidebar-button"
          onClick={() => props.Toggle()}
        >
          <i className="fas fa-align-right"></i>
          <span> منوی کاربر</span>
        </button>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  Toggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarToggler);
