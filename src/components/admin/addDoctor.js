import React, { Component } from "react";
import "../../css/register.css";
import "../../css/sidebar.css";
import { addDoctor } from "./../../actions/auth";
import { deleteMessage } from "./../../actions/message";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideBar from "./sideBar";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import Swal from "sweetalert2";

const errorMsg = {
  user_name: " نام کاربری باید ۱۰ کاراکتر و شامل اعداد انگلیسی باشد.",
  birth_date: " تاریخ تولد باید به صورت xxxx-xx-xx باشد.",
  first_name: " نام باید بیشتر از ۳ کاراکتر باشد.",
  last_name: "نام خانوادگی باید بیشتر از ۳ کاراکتر باشد.",
  address: "آدرس باید بیشتر از ۳۰ کاراکتر باشد.",
  mobile_number:
    " تلفن همراه باید به صورت ۰۹xxxxxxxxx و شامل حروف انگلیسی باشد.",
  phone_number:
    "تلفن ثابت باید به صورت xxx-xxxxxxxx  و شامل حروف انگلیسی باشد.",
  email: " ایمیل نا معتبر است.",
  speciality: " تخصص باید بیشتر از ۳کاراکتر باشد.",
  bio: "بیو نامعتبر است.",
  avatar: "فایل انتخاب شده قابل قبول نیست",
};

class AddDoctor extends Component {
  state = {
    firstName: "",
    lastName: "",
    gender: "0",
    birthDate: "",
    mobilePhone: "",
    phone: "",
    address: "",
    speciality: "",
    bio: "",
    nationalId: "",
    email: "",
    avatar: "",
    showingAlert: false,
    isActive: false,
    isAddPatient: false,
  };

  static propTypes = {
    addDoctor: PropTypes.func.isRequired,
    auth: PropTypes.object,
    deleteMessage: PropTypes.func,
    message: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.message.status != null) {
      Swal.fire({
        position: "center",
        icon: this.props.message.status,
        text: this.props.message.msg,
        showConfirmButton: false,
        timer: 3000,
      });
      this.props.deleteMessage();
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const doctor = {
      user: {
        username: this.state.nationalId,
        password: this.state.nationalId,
      },
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      mobile_number: this.state.mobilePhone,
      phone_number: this.state.phone,
      address: this.state.address,
      birth_date: this.state.birthDate,
      speciality: this.state.speciality,
      bio: this.state.bio,
      gender: this.state.gender,
      email: this.state.email,
      avatar: this.state.avatar,
    };
    this.props.addDoctor(doctor);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      birthDate: date,
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
      birthDate,
      mobilePhone,
      phone,
      address,
      speciality,
      bio,
      nationalId,
      email,
      avatar,
    } = this.state;

    return (
      <div className="wrapper">
        <SideBar
          isActive={this.state.isActive}
          isAddPatient={this.state.isAddPatient}
        />
        <div id="content">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-info sidebar-button"
                onClick={this.handleToggleSidebar}
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
                  ? "add-doctor-card card text-right active"
                  : "add-doctor-card card text-right"
              }
            >
              <h5 className="card-header text-body text-center pt-3 font-weight-bold">
                ثبت نام پزشک
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
                        className={
                          this.props.message.msg.first_name
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="firstName"
                        placeholder="نام"
                        onChange={this.handleChange}
                        value={firstName}
                        required
                      />
                      {this.props.message.msg.first_name ? (
                        <div className="invalid-feedback">
                          {errorMsg["first_name"]}
                        </div>
                      ) : (
                        <div className="invalid-feedback" />
                      )}
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="lastName" className="float-right">
                        نام خانوادگی
                      </label>
                      <input
                        type="text"
                        className={
                          this.props.message.msg.last_name
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="lastName"
                        placeholder="نام خانوادگی"
                        onChange={this.handleChange}
                        value={lastName}
                        required
                      />
                      {this.props.message.msg.last_name ? (
                        <div className="invalid-feedback">
                          {errorMsg["last_name"]}
                        </div>
                      ) : (
                        <div className="invalid-feedback" />
                      )}
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="nationalId" className="float-right">
                        کدملی
                      </label>
                      <input
                        dir="ltr"
                        type="text"
                        className={
                          this.props.message.msg.user
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="nationalId"
                        placeholder="کد ملی"
                        onChange={this.handleChange}
                        value={nationalId}
                        required
                      />
                      {this.props.message.msg.user ? (
                        <div className="invalid-feedback">
                          {errorMsg["user_name"]}
                        </div>
                      ) : (
                        <div className="invalid-feedback" />
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md">
                      <label htmlFor="email" className="float-right">
                        ایمیل
                      </label>
                      <input
                        dir="ltr"
                        type="email"
                        className={
                          this.props.message.msg.email
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="email"
                        placeholder="example@gmail.com"
                        onChange={this.handleChange}
                        value={email}
                        required
                      />
                      {this.props.message.msg.email ? (
                        <div className="invalid-feedback">
                          {errorMsg["email"]}
                        </div>
                      ) : (
                        <div className="invalid-feedback" />
                      )}
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="mobilePhone" className="float-right">
                        شماره موبایل
                      </label>
                      <input
                        dir="ltr"
                        type="tel"
                        className={
                          this.props.message.msg.mobile_number
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="mobilePhone"
                        placeholder="0912xxxxxxx"
                        onChange={this.handleChange}
                        value={mobilePhone}
                        required
                      />
                      {this.props.message.msg.mobile_number ? (
                        <div className="invalid-feedback">
                          {errorMsg["mobile_number"]}
                        </div>
                      ) : (
                        <div className="invalid-feedback" />
                      )}
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="phone" className="float-right">
                        شماره مطب
                      </label>
                      <input
                        dir="ltr"
                        type="tel"
                        className={
                          this.props.message.msg.phone_number
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="phone"
                        placeholder="021xxxxxxxx"
                        onChange={this.handleChange}
                        value={phone}
                        required
                      />
                      {this.props.message.msg.phone_number ? (
                        <div className="invalid-feedback">
                          {errorMsg["phone_number"]}
                        </div>
                      ) : (
                        <div className="invalid-feedback" />
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md">
                      <label htmlFor="address" className="float-right">
                        آدرس
                      </label>
                      <input
                        type="text"
                        className={
                          this.props.message.msg.address
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="address"
                        placeholder="آدرس"
                        onChange={this.handleChange}
                        value={address}
                        required
                      />
                      {this.props.message.msg.address ? (
                        <div className="invalid-feedback">
                          {errorMsg["address"]}
                        </div>
                      ) : (
                        <div className="invalid-feedback" />
                      )}
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="speciality" className="float-right">
                        تخصص
                      </label>
                      <input
                        type="text"
                        className={
                          this.props.message.msg.speciality
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="speciality"
                        placeholder="تخصص"
                        onChange={this.handleChange}
                        value={speciality}
                        required
                      />
                      {this.props.message.msg.speciality ? (
                        <div className="invalid-feedback">
                          {errorMsg["speciality"]}
                        </div>
                      ) : (
                        <div className="invalid-feedback" />
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label htmlFor="birthDate" className="float-right">
                        تاریخ تولد
                      </label>
                      <input
                        type="date"
                        className={
                          this.props.message.msg.birth_date
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="birthDate"
                        placeholder="تاریخ تولد"
                        onChange={this.handleChange}
                        value={birthDate}
                        required
                      />
                      {this.props.message.msg.bio ? (
                        <div className="invalid-feedback">
                          {errorMsg["birth_date"]}
                        </div>
                      ) : (
                        <div className="invalid-feedback" />
                      )}
                    </div>
                    <div className="form-group col-md-9">
                      <label htmlFor="bio" className="float-right">
                        درباره شما
                      </label>
                      <input
                        type="text"
                        className={
                          this.props.message.msg.bio
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="bio"
                        placeholder="فوق تخصص بیماری های ریه و مراقبت های ویژه ..."
                        onChange={this.handleChange}
                        value={bio}
                      />
                      {this.props.message.msg.bio ? (
                        <div className="invalid-feedback">
                          {errorMsg["bio"]}
                        </div>
                      ) : (
                        <div className="invalid-feedback" />
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <p className="float-right pr-2 pl-2">جنسیت</p>
                    <div className="form-check">
                      <div className="form-group col-md">
                        <label htmlFor="gender" className="float-right">
                          مرد
                        </label>
                        <input
                          type="radio"
                          id="gender"
                          name="gender"
                          value="0"
                          checked={this.state.gender === "0"}
                          onChange={this.handleChange}
                          className="form-check-input my-radio-button"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-check">
                      <div className="form-group col-md">
                        <label htmlFor="gender" className="float-right">
                          زن
                        </label>
                        <input
                          type="radio"
                          id="gender"
                          name="gender"
                          value="1"
                          checked={this.state.gender === "1"}
                          onChange={this.handleChange}
                          className="form-check-input my-radio-button"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md float-right">
                      <div className="form-group">
                        <label htmlFor="avatar" className="avatar-label">
                          عکس پروفایل
                        </label>
                        <input
                          type="file"
                          className={
                            this.props.message.msg.avatar
                              ? "form-control-file is-invalid"
                              : "form-control-file"
                          }
                          id="avatar"
                          value={avatar}
                          onChange={this.handleChange}
                        />
                        {this.props.message.msg.avatar ? (
                          <div className="invalid-feedback">
                            {errorMsg["avatar"]}
                          </div>
                        ) : (
                          <div className="invalid-feedback" />
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary z-depth-0 btn-block mb-2"
                  >
                    افزودن پزشک
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
  message: state.message,
});

export default connect(mapStateToProps, { addDoctor, deleteMessage })(
  AddDoctor
);
