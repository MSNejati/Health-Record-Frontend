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
        <h3>دکتر</h3>
      </div>
      <ul className="list-unstyled components">
        <p> بیمه ایران</p>
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
          <Link to="/" className="nav-link">
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
        <li>
          <button
            to="/"
            type="link"
            className="nav-link btn btn-danger"
            onClick={props.logout}
          >
            خروج
          </button>
        </li>
      </ul>
    </nav>
  );
}

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(SideBar);
