import React, { Component } from "react";
import axios from "axios";
import { userAPI } from "../../apis/requests";
import "../../css/register.css";
import Loading from "../layout/Loading";
import { Link } from "react-router-dom";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import { connect } from "react-redux";

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

  render() {
    const { patients } = this.state;
    const patientsList = patients ? (
      patients.map((patient) => {
        return (
          <div
            className={this.props.isActive ? "my-card active" : "my-card"}
            key={patient.id}
          >
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
        <SideBar />
        <div id="content">
          <SideBarToggler />
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

const mapStateToProps = (state) => ({
  isActive: state.sidebar.active,
});

export default connect(mapStateToProps)(listOfPatients);
