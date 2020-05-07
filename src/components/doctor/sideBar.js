import React from "react";
import { Link } from "react-router-dom";
import { logout } from "./../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../css/sidebar.css";

function SideBar(props) {
  return (
    <nav id="sidebar" className={props.isActive ? "active" : ""}>
      <div className="sidebar-header">
        <h3>صفحه پزشک</h3>
      </div>
      <ul className="list-unstyled components">
        <li>
          <Link to="/" className="nav-link">
            خانه
          </Link>
        </li>
        <li>
          <Link to="/doctor/profile" className="nav-link ">
            پروفایل شخصی
          </Link>
        </li>
        <li>
          <Link to="/doctor/turns" className="nav-link">
            مدیریت نوبت ها
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link">
            قرارهای ملاقات
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link">
            موارد دیگر
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
        className="nav-link btn exit-button"
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
