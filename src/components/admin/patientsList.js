import React, { Component } from "react";
import axios from "axios";
import { userAPI } from "../../apis/requests";
import "../../css/index.css";
import Loading from "../layout/Loading";
import { Link } from "react-router-dom";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import { connect } from "react-redux";

class listOfPatients extends Component {
  state = {
    patients: null,
    aboutDoctor: false,
    isList: true,
  };

  componentDidMount() {
    axios.get(userAPI("MANAGE_PATIENTS")).then((res) => {
      this.setState({ patients: res.data.results });
    });
  }

  render() {
    const { patients } = this.state;
    const patientsList = patients ? (
      patients.map((patient) => {
        return (
          <div
            className={
              this.props.isActive
                ? "my-card card text-right active"
                : "my-card card text-right"
            }
            key={patient.id}
          >
            <div className="card-body">
              <div className="form-row">
                <div className="col-md-2">
                  <img src={patient.avatar} alt="تصویر پروفایل"></img>
                </div>
                <div className="col-md-10">
                  <div className="form-row">
                    <div className="col-md-4">
                      <p>
                        <strong>نام: </strong> {patient.first_name}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <strong>نام خانوادگی: </strong> {patient.last_name}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <strong>کد ملی: </strong> {patient.user.username}
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-4">
                      <p>
                        <strong>شماره موبایل: </strong> {patient.mobile_number}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <strong>تاریخ تولد: </strong> {patient.birth_date}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <Link
                        to={"/patients/" + patient.id}
                        className="btn purple-btn float-left"
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
      <div
        className={
          this.props.isActive ? "wrapper admin-bg active" : "wrapper admin-bg"
        }
      >
        <SideBar />
        <div id="content">
          <SideBarToggler />
          <div className="page-content">
            <div
              className={
                this.props.isActive ? "text-right active" : "text-right"
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

const mapStateToProps = (state) => ({
  isActive: state.sidebar.active,
});

export default connect(mapStateToProps)(listOfPatients);
