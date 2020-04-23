import React, { Component } from "react";
import SideBar from "./sideBar";
import axios from "axios";
import { userAPI } from "./../../apis/requests";
import Loading from "./../layout/Loading";
import "./../../css/register.css";
import ppic from "./../../static/img/51-512.png";

export class PatientProfile extends Component {
  state = {
    showingAlert: false,
    isActive: false,
    patient: null,
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
    console.log(this.state.patient);
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
          <div
            className="my-Register-page"
            style={{ marginRight: "4vw", fontSize: "1.5em" }}
          >
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
                    borderRedius: "100%",
                  }}
                  src={ppic}
                ></img>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="firstName" className="float-right ml-2">
                      نام:
                    </label>
                    {this.state.patient.first_name}
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="lastName" className="float-right ml-2">
                      نام خانوادگی:
                    </label>
                    {this.state.patient.last_name}
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="lastName" className="float-right ml-2">
                      کدملی:
                    </label>
                    {this.state.patient.user.username}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="birthDate" className="float-right ml-2">
                      تاریخ تولد:
                    </label>
                    {this.state.patient.birth_date}
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="phone" className="float-right ml-2">
                      شماره موبایل:
                    </label>
                    {this.state.patient.mobile_number}
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="phone" className="float-right ml-2">
                      جنسیت:
                    </label>
                    {this.state.patient.gender}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="address" className="float-right ml-2">
                      ایمیل:
                    </label>
                    {this.state.patient.user.email}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="address" className="float-right ml-2">
                      آدرس:
                    </label>
                    {this.state.patient.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default PatientProfile;
