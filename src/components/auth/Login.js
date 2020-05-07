import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import "../../css/login.css";
import Navbar from "../layout/Navbar";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object,
    errors: PropTypes.object,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(user);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      switch (this.props.auth.user.role) {
        case 0:
          this.props.history.push("/add-doctor");
          break;
        case 1:
          this.props.history.push("/doctor/profile");
          break;
        case 2:
          this.props.history.push("/patient/profile");
          break;
        default:
          break;
      }
    }
  }

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <Navbar />
        <div className="my-login-page">
          <div className="my-login-card card text-right">
            <h5 className="card-header text-body text-center pt-3 font-weight-bold">
              ورود به حساب کاربری
            </h5>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group pt-3">
                  <label htmlFor="username" className="float-right">
                    نام کاربری
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="نام کاربری"
                    onChange={this.handleChange}
                    value={username}
                    required
                  />
                </div>
                <div className="form-group pb-1">
                  <label htmlFor="password" className="float-right">
                    رمز عبور
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="رمز عبور"
                    onChange={this.handleChange}
                    value={password}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn z-depth-0 btn-block mb-2 my-button"
                >
                  ورود به سامانه
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.message.errors,
});

export default connect(mapStateToProps, { login })(Login);
