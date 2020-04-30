import React, { Component } from "react";
import SideBar from "./sideBar";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userAPI } from "./../../apis/requests";
import Loading from "./../layout/Loading";
import "./../../css/profile.css";
import EditIcon from "./../../static/icons/edit_icon.svg";
import EditDialog from "./../layout/EditDialog";
import ChangePasswordDialog from "./../layout/ChangePasswordDialog";

export class DotorProfile extends Component {
  state = {
    showingAlert: false,
    isActive: false,
    doctor: null,
    editField: null,
  };

  static propTypes = {
    auth: PropTypes.object,
  };

  onEdit = (field) => {
    this.setState({ editField: field });
  };

  handleToggleSidebar = (event) => {
    event.preventDefault();
    this.setState({
      isActive: !this.state.isActive,
    });
  };
  async componentDidMount() {
    if (this.props.auth.user.role === 1) {
      await axios
        .get(userAPI("PROFILE"))
        .then((res) => this.setState({ doctor: res.data }));
    } else if (this.props.auth.user.role === 0) {
      await axios
        .get(userAPI("MANAGE_DOCTORS", this.props.match.params.id))
        .then((res) => this.setState({ doctor: res.data }));
    }
  }
  render() {
    return this.state.doctor ? (
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
              <div className="text-center card-header">
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "20%",
                  }}
                  src={this.state.doctor.avatar}
                ></img>
                <button
                  type="button"
                  className="btn float-right p-0"
                  data-toggle="modal"
                  data-target="#editDialog"
                  onClick={() => {
                    this.onEdit("avatar");
                  }}
                >
                  <img
                    src={EditIcon}
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    alt="ویرایش"
                  ></img>
                </button>
              </div>
              <div className="card-body" style={{ whiteSpace: "nowrap" }}>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="firstName" className="float-right">
                      نام:
                      {this.state.doctor.first_name}
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("first_name");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="lastName" className="float-right">
                      نام خانوادگی:
                      {this.state.doctor.last_name}
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("last_name");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="lastName" className="float-right">
                      کدملی:
                      {this.state.doctor.user.username}
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="address" className="float-right">
                      تلفن ثابت:
                      <label style={{ direction: "ltr" }}>
                        {this.state.doctor.phone_number}
                      </label>
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("phone_number");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="phone" className="float-right">
                      شماره موبایل:
                      {this.state.doctor.mobile_number}
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("mobile_number");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="speciality" className="float-right">
                      تخصص:
                      {this.state.doctor.speciality}
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("speciality");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="birthDate" className="float-right">
                      تاریخ تولد:
                      <label style={{ direction: "ltr" }}>
                        {this.state.doctor.birth_date}
                      </label>
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("birth_date");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="gender" className="float-right">
                      جنسیت:
                      {this.state.doctor.gender ? (
                        <label>زن</label>
                      ) : (
                        <label>مرد</label>
                      )}
                    </label>
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="email" className="float-right p-0">
                      ایمیل:
                      <label style={{ direction: "ltr" }}>
                        {this.state.doctor.user.email}
                      </label>
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("email");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="address" className="float-right">
                      آدرس:
                      {this.state.doctor.address}
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("address");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="bio" className="float-right">
                      درباره شما:
                      {this.state.doctor.bio}
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("bio");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#changePassDialog"
                  className="btn btn-secondary "
                >
                  تغییر رمز عبور
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
        <EditDialog
          field={this.state.editField}
          api={
            this.props.auth.user.role === 1
              ? userAPI("PROFILE")
              : userAPI("MANAGE_DOCTORS", this.props.match.params.id)
          }
        />
        <ChangePasswordDialog />
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DotorProfile);
