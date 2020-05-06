import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-primary my-navbar">
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#collapse_target"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapse_target">
          <a className="navbar-brand">کارنامه سلامت</a>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                دکتر
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                مریض
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                درباره ما
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                حساب کاربری
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
