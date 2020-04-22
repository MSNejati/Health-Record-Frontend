import React, { Component } from "react";
import { Link, navLink } from "react-router-dom";
import "../../css/sidebar.css";

class AdminSidebar extends Component {
  render() {
    return (
      <nav id="sidebar">
        <div class="sidebar-header">
          <h3>کارنامه سلامت</h3>
        </div>
        <ul class="list-unstyled components">
          <p> بیمه ایران</p>
          <li>
            <Link to="/" className="nav-link">
              خانه
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              افزودن پزشک
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              افزودن بیمار
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              درباره ما
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default AdminSidebar;
