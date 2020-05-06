import React from "react";
import { Link } from "react-router-dom";
import { logout } from "./../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function SideBar(props) {
  return (
    <nav id="sidebar" className={props.isActive ? "active" : ""}>
      <div className="sidebar-header">
        <h3>کارنامه سلامت</h3>
      </div>
      <ul className="list-unstyled components">
        <p> بیمه ایران</p>
        <li>
          <Link to="/" className="nav-link">
            خانه
          </Link>
        </li>
        <li className={props.isAddPatient ? "" : "active"}>
          <Link to="/add-doctor" className="nav-link ">
            ثبت نام پزشک
          </Link>
        </li>
        <li className={props.isAddPatient ? "active" : ""}>
          <Link to="/add-patient" className="nav-link">
            ثبت نام بیمار
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link">
            درباره ما
          </Link>
        </li>
      </ul>
      <button
        to="/"
        type="link"
        className="nav-link btn btn-danger"
        onClick={props.logout}
      >
        خروج
      </button>
    </nav>
  );
}

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(SideBar);
