import React, { Component } from "react";
import axios from "axios";
import { userAPI } from "../../apis/requests";
import "../../css/register.css";
import SideBar from "./sideBar";
import Loading from "../layout/Loading";
import { Link } from "react-router-dom";

class listOfPatients extends Component {
  state = {
    patients: null,
    isActive: false,
    aboutDoctor: false,
    isList: true,
  };

  componentDidMount() {
    axios.get(userAPI("MANAGE_PATIENTS")).then((res) => {
      this.setState({ patients: res.data.results });
    });
  }

  handleToggleSidebar = (event) => {
    event.preventDefault();
    this.setState({
      isActive: !this.state.isActive,
    });
  };

  render() {
    const { patients } = this.state;
    const patientsList = patients ? (
      patients.map((patient) => {
        return (
          <div className="my-card" key={patient.id}>
            <div className="card-body">
              <div className="form-row">
                <div className="form-group col-md-2">
                  <img src={patient.avatar} alt="تصویر پروفایل"></img>
                </div>
                <div className="form-group col-md-10">
                  <div className="form-row">
                    <div className="form-group col-md">
                      <p>
                        <strong>نام: </strong> {patient.first_name}
                      </p>
                    </div>
                    <div className="form-group col-md">
                      <p>
                        <strong>نام خانوادگی: </strong> {patient.last_name}
                      </p>
                    </div>
                    <div className="form-group col-md">
                      <p>
                        <strong>کد ملی: </strong> {patient.user.username}
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md">
                      <p>
                        <strong>شماره موبایل: </strong> {patient.mobile_number}
                      </p>
                    </div>
                    <div className="form-group col-md">
                      <p>
                        <strong>تاریخ تولد: </strong> {patient.birth_date}
                      </p>
                    </div>
                    <div className="form-group col-md">
                      <Link
                        to={"/patients/" + patient.id}
                        className="btn profile-button"
                        style={{ float: "left" }}
                      >
                        پروفایل
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <Loading />
    );
    return (
      <div className="wrapper">
        <SideBar
          isActive={this.state.isActive}
          isList={this.state.isList}
          aboutDoctor={this.state.aboutDoctor}
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
                this.state.isActive ? "text-right active" : "text-right"
              }
            >
              {patientsList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default listOfPatients;
