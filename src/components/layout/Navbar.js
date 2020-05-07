import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-expand-md navbar-dark my-navbar">
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#collapse_target"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapse_target">
          <Link to="/" className="navbar-brand">
            کارنامه سلامت
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
