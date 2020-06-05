import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userAPI } from "./../../apis/requests";
import Loading from "./../layout/Loading";
import "./../../css/index.css";
import EditIcon from "./../../static/icons/edit_icon.svg";
import EditDialog from "./../layout/EditDialog";
import ChangePasswordDialog from "./../layout/ChangePasswordDialog";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import Swal from "sweetalert2";

export class PatientProfile extends Component {
  state = {
    showingAlert: false,
    patient: null,
    editField: null,
  };

  static propTypes = {
    auth: PropTypes.object,
  };

  onEdit = (field) => {
    this.setState({ editField: field });
  };

  handleDelete = (event) => {
    event.preventDefault();
    const { id } = this.props.match.params;
    Swal.fire({
      title: "آيا مطمئن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2cbdb1f6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.value) {
        axios
          .delete(userAPI("MANAGE_PATIENTS", id))
          .then((res) => {
            this.props.history.push("/patients");
            Swal.fire({
              title: "حذف با موفقیت انجام شد",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "حذف ناموفق بود",
              icon: "error",
            });
          });
      }
    });
  };

  async componentDidMount() {
    if (this.props.auth.user.role === 2) {
      await axios
        .get(userAPI("PROFILE"))
        .then((res) => this.setState({ patient: res.data }));
    } else if (this.props.auth.user.role === 0) {
      await axios
        .get(userAPI("MANAGE_PATIENTS", this.props.match.params.id))
        .then((res) => this.setState({ patient: res.data }));
    }
  }
  setPatient = (data) => {
    this.setState({ patient: data });
  };
  render() {
    return this.state.patient ? (
      <div
        className={
          this.props.auth.user.role === 2
            ? this.props.isActive
              ? "wrapper patient-bg active"
              : "wrapper patient-bg"
            : this.props.isActive
            ? "wrapper admin-bg active"
            : "wrapper admin-bg"
        }
      >
        <SideBar />
        <div id="content">
          <SideBarToggler />
          <div className="page-content">
            <div
              className={
                this.props.isActive
                  ? "my-card card text-right active"
                  : "my-card card text-right"
              }
            >
              <div className="text-center card-header">
                <img
                  className="profile-img"
                  src={this.state.patient.avatar}
                  alt="تصویر پروفایل"
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
                  <img src={EditIcon} className="edit-img" alt="ویرایش"></img>
                </button>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="col-md">
                    <div className="form-row">
                      <div className="col-md-4">
                        <p className="float-right ml-2">
                          <strong> نام: </strong>
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
                              className="edit-img"
                              alt="ویرایش"
                            ></img>
                          </button>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="float-right ml-2">
                          <strong> نام خانوادگی: </strong>
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
                              className="edit-img"
                              alt="ویرایش"
                            ></img>
                          </button>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="float-right ml-2">
                          <strong> کدملی: </strong>
                          {this.state.patient.user.username}
                        </p>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-4">
                        <p className="float-right ml-2">
                          <strong> تاریخ تولد: </strong>
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
                              className="edit-img"
                              alt="ویرایش"
                            ></img>
                          </button>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="float-right ml-2">
                          <strong> شماره موبایل: </strong>
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
                              className="edit-img"
                              alt="ویرایش"
                            ></img>
                          </button>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="float-right ml-2">
                          <strong> جنسیت: </strong>
                          {this.state.patient.gender ? (
                            <label>زن</label>
                          ) : (
                            <label>مرد</label>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md">
                        <p className="float-right ml-2">
                          <strong> ایمیل: </strong>
                          {this.state.patient.user.email}
                          <button
                            type="button"
                            className="btn float-left p-0"
                            data-toggle="modal"
                            data-target="#editDialog"
                            onClick={() => {
                              this.onEdit("user.email");
                            }}
                          >
                            <img
                              src={EditIcon}
                              className="edit-img"
                              alt="ویرایش"
                            ></img>
                          </button>
                        </p>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md">
                        <p className="float-right ml-2">
                          <strong> آدرس: </strong>
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
                              className="edit-img"
                              alt="ویرایش"
                            ></img>
                          </button>
                        </p>
                      </div>
                    </div>
                    {this.props.auth.user.role !== 0 ? (
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#changePassDialog"
                        className="btn purple-btn float-left"
                      >
                        تغییر رمز عبور
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
        <EditDialog
          field={this.state.editField}
          set={this.setPatient}
          api={
            this.props.auth.user.role === 2
              ? userAPI("PROFILE")
              : userAPI("MANAGE_PATIENTS", this.props.match.params.id)
          }
        />
        {this.props.auth.user.role !== 0 ? <ChangePasswordDialog /> : null}
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isActive: state.sidebar.active,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile);
