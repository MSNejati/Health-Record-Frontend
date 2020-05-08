import React, { Component } from "react";
import axios from "axios";
import "../../css/register.css";
import { userAPI } from "../../apis/requests";
import Loading from "../layout/Loading";
import { Link } from "react-router-dom";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";

class listOfPatients extends Component {
  state = {
    doctors: null,
    isActive: false,
    aboutDoctor: true,
    isList: true,
  };

  componentDidMount() {
    axios.get(userAPI("MANAGE_DOCTORS")).then((res) => {
      this.setState({ doctors: res.data.results });
    });
  }

  handleToggleSidebar = (event) => {
    event.preventDefault();
    this.setState({
      isActive: !this.state.isActive,
    });
  };

  render() {
    const { doctors } = this.state;
    const doctorsList = doctors ? (
      doctors.map((doctor) => {
        return (
          <div className="my-card" key={doctor.id}>
            <div className="card-body">
              <div className="form-row">
                <div className="form-group col-md-2">
                  <img src={doctor.avatar} alt="تصویر پروفایل"></img>
                </div>
                <div className="form-group col-md-10">
                  <div className="form-row">
                    <div className="form-group col-md">
                      <p>
                        <strong>نام: </strong> {doctor.first_name}
                      </p>
                    </div>
                    <div className="form-group col-md">
                      <p>
                        <strong>نام خانوادگی: </strong> {doctor.last_name}
                      </p>
                    </div>
                    <div className="form-group col-md">
                      <p>
                        <strong>کد ملی: </strong> {doctor.user.username}
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md">
                      <p>
                        <strong>تخصص: </strong> {doctor.speciality}
                      </p>
                    </div>
                    <div className="form-group col-md">
                      <p>
                        <strong>شماره موبایل: </strong> {doctor.mobile_number}
                      </p>
                    </div>
                    <div className="form-group col-md">
                      <Link
                        to={"/doctors/" + doctor.id}
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
        <SideBar />
        <div id="content">
          <SideBarToggler />
          <div className="my-Register-page">
            <div
              className={
                this.state.isActive ? "text-right active" : "text-right"
              }
            >
              {doctorsList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default listOfPatients;
