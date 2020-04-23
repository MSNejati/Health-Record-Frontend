import React, { Component } from "react";
import "../../css/register.css";
import "../../css/sidebar.css";
import { addPatient } from "./../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideBar from "./sideBar";

class AddPatient extends Component {
  state = {
    firstName: "",
    lastName: "",
    gender: "0",
    birthDate: "",
    phone: "",
    address: "",
    nationalId: "",
    showingAlert: false,
    isActive: false,
  };
  static propTypes = {
    addPatient: PropTypes.func.isRequired,
    auth: PropTypes.object,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const patient = {
      user: {
        username: this.state.nationalId,
        password: this.state.nationalId,
      },
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      mobile_number: this.state.phone,
      address: this.state.address,
      gender: this.state.gender,
      birth_date: this.state.birthDate,
    };
    this.props.addPatient(patient);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleToggleSidebar = (event) => {
    event.preventDefault();
    this.setState({
      isActive: !this.state.isActive,
    });
  };

  render() {
    const {
      firstName,
      lastName,
      gender,
      birthDate,
      phone,
      address,
      nationalId,
    } = this.state;

    return (
      <div className="wrapper">
        <SideBar isActive={this.state.isActive} />
        <div id="content">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-info"
                onClick={this.handleToggleSidebar}
                style={{ backgroundColor: "#5676f6", borderColor: "#4f6bdb" }}
              >
                <i className="fas fa-align-right"></i>
                <span> منوی کاربر</span>
              </button>
            </div>
          </nav>
          <div className="my-Register-page">
            <div
              className={
                this.state.isActive
                  ? "my-Register-card card text-right active"
                  : "my-Register-card card text-right"
              }
            >
              <h5 className="card-header text-body text-center pt-3 font-weight-bold">
                ثبت نام بیمار
              </h5>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md">
                      <label htmlFor="firstName" className="float-right">
                        نام
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="نام"
                        onChange={this.handleChange}
                        value={firstName}
                      />
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="lastName" className="float-right">
                        نام خانوادگی
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="نام خانوادگی"
                        onChange={this.handleChange}
                        value={lastName}
                      />
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="lastName" className="float-right">
                        کدملی
                      </label>
                      <input
                        dir="ltr"
                        type="text"
                        className="form-control"
                        id="nationalId"
                        placeholder="کد ملی"
                        onChange={this.handleChange}
                        value={nationalId}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md">
                      <label htmlFor="birthDate" className="float-right">
                        تاریخ تولد
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="birthDate"
                        placeholder="تاریخ تولد"
                        onChange={this.handleChange}
                        value={birthDate}
                      />
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="phone" className="float-right">
                        شماره موبایل
                      </label>
                      <input
                        dir="ltr"
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="0912xxxxxxx"
                        onChange={this.handleChange}
                        value={phone}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md">
                      <label htmlFor="address" className="float-right">
                        آدرس
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="آدرس"
                        onChange={this.handleChange}
                        value={address}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="gender"
                      className="float-right"
                      value={gender}
                    >
                      جنسیت
                    </label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={this.handleChange}
                    >
                      <option value="0">مرد</option>
                      <option value="1">زن</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary z-depth-0 btn-block mb-2"
                  >
                    افزودن بیمار
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPatient })(AddPatient);
