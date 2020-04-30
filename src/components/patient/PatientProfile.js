import React, { Component } from "react";
import SideBar from "./sideBar";
import axios from "axios";
import { userAPI } from "./../../apis/requests";
import Loading from "./../layout/Loading";
import "./../../css/profile.css";
import EditIcon from "./../../static/icons/edit_icon.svg";
import EditDialog from "./../layout/EditDialog";
import ChangePasswordDialog from "./../layout/ChangePasswordDialog";

export class PatientProfile extends Component {
  state = {
    showingAlert: false,
    isActive: false,
    patient: null,
    editField: null,
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
    await axios
      .get(userAPI("PROFILE"))
      .then((res) => this.setState({ patient: res.data }));
  }
  render() {
    return this.state.patient ? (
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
                  src={this.state.patient.avatar}
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
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="firstName" className="float-right ml-2">
                      نام:
                      {this.state.patient.first_name}
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
                    <label htmlFor="lastName" className="float-right ml-2">
                      نام خانوادگی:
                      {this.state.patient.last_name}
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
                    <label htmlFor="lastName" className="float-right ml-2">
                      کدملی:
                      {this.state.patient.user.username}
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="birthDate" className="float-right ml-2">
                      تاریخ تولد:
                      <label style={{ direction: "ltr" }}>
                        {this.state.patient.birth_date}
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
                    <label htmlFor="phone" className="float-right ml-2">
                      شماره موبایل:
                      {this.state.patient.mobile_number}
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
                    <label htmlFor="phone" className="float-right ml-2">
                      جنسیت:
                      {this.state.patient.gender ? (
                        <label>زن</label>
                      ) : (
                        <label>مرد</label>
                      )}
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="address" className="float-right ml-2">
                      ایمیل:
                      <label style={{ direction: "ltr" }}>
                        {this.state.patient.user.email}
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
                    <label htmlFor="address" className="float-right ml-2">
                      آدرس:
                      {this.state.patient.address}
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
        <EditDialog field={this.state.editField} />
        <ChangePasswordDialog />
      </div>
    ) : (
      <Loading />
    );
  }
}

export default PatientProfile;
