import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../../css/sidebar.css";
import { withRouter } from "react-router-dom";

const items = {
  0: [
    { content: "اضافه کردن پزشک", path: "/add-doctor" },
    { content: "اضافه کردن بیمار", path: "/add-patient" },
    { content: "لیست بیمارها", path: "/patients" },
    { content: "لیست پزشک ها", path: "/doctors" },
  ],
  1: [
    { content: "پروفایل شخصی", path: "/doctor/profile" },
    { content: "مدیریت نوبت ها", path: "/doctor/calendar" },
  ],
  2: [{ content: "پروفایل شخصی", path: "/patient/profile" }],
};

export const SideBar = (props) => {
  return (
    <div className="d-flex">
      <nav id="sidebar" className={props.active ? "active" : ""}>
        <div className="sidebar-header">
          <h3>
            {props.user.role === 0
              ? "مدیر"
              : props.user.role === 1
              ? "دکتر"
              : props.user.role === 2
              ? "بیمار"
              : null}
          </h3>
        </div>
        <ul className="list-unstyled components">
          {items[props.user.role].map((item, index) => (
            <li
              key={index}
              className={
                props.history.location.pathname === item.path ? "active" : ""
              }
            >
              <Link to={item.path} className="nav-link">
                {item.content}
              </Link>
            </li>
          ))}
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
    </div>
  );
};

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  active: state.sidebar.active,
  user: state.auth.user,
});

const mapDispatchToProps = {
  logout,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideBar)
);
