import React, { Component } from "react";
import axios from "axios";
import "../../css/register.css";
import "./css/admin.css";
import { userAPI } from "../../apis/requests";
import Loading from "../layout/Loading";
import { Link } from "react-router-dom";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import { connect } from "react-redux";

class listOfPatients extends Component {
  state = {
    doctors: null,
    aboutDoctor: true,
    isList: true,
  };

  componentDidMount() {
    axios.get(userAPI("MANAGE_DOCTORS")).then((res) => {
      this.setState({ doctors: res.data.results });
    });
  }

  render() {
    const { doctors } = this.state;
    const doctorsList = doctors ? (
      doctors.map((doctor) => {
        return (
          <div
            className={
              this.props.isActive
                ? "list-item-card card text-right active"
                : "list-item-card card text-right"
            }
            key={doctor.id}
          >
            <div className="card-body">
              <div className="form-row">
                <div className="col-md-2">
                  <img src={doctor.avatar} alt="تصویر پروفایل"></img>
                </div>
                <div className="col-md-10">
                  <div className="form-row">
                    <div className="col-md-4">
                      <p>
                        <strong>نام: </strong> {doctor.first_name}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <strong>نام خانوادگی: </strong> {doctor.last_name}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <strong>کد ملی: </strong> {doctor.user.username}
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-4">
                      <p>
                        <strong>تخصص: </strong> {doctor.speciality}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <strong>شماره موبایل: </strong> {doctor.mobile_number}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <Link
                        to={"/doctors/" + doctor.id}
                        className="btn purple-button float-left"
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
            <div> {doctorsList} </div>
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
