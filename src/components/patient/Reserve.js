import React, { Component } from "react";
import { connect } from "react-redux";
import { patientAPI } from "./../../apis/requests";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import axios from "axios";
import Loading from "./../layout/Loading";
import "../../css/index.css";

export class Reserve extends Component {
  state = {
    calendar: null,
    reserved: true,
  };

  componentDidMount() {
    axios
      .post(
        patientAPI("TURNS"),

        {
          action: "status",
          calendar_id: this.props.match.params.id,
        },
        {}
      )
      .then((res) => {
        this.setState({ reserved: true });
      })
      .catch((err) => {
        this.setState({ reserved: false });
      });
    axios.get(patientAPI("TURNS", this.props.match.params.id)).then((res) =>
      this.setState({
        calendar: res.data,
        turn: res.data.total - res.data.remained + 1,
      })
    );
  }

  onClick = (e) => {
    axios
      .post(patientAPI("TURNS"), {
        action: "accept",
        calendar_id: this.props.match.params.id,
      })
      .then((res) => {
        window.location.reload();
      });
  };
  render() {
    return this.state.calendar ? (
      <div className="d-flex" style={{ backgroundColor: "rgba(253, 194, 0, 0.45)"}}>
        <SideBar />
        <div id="content" className="w-100">
          <SideBarToggler />

          <div className="text-right mx-5 my-5">
            <div>
              <h3>پزشک:</h3>
              <div className="card border-warning rounded shadow" style={{ backgroundColor: "rgba(253, 194, 0, 0.6)"}}>
                <div className="d-flex flex-row m-2">
                  <div>
                    <img
                      className="profile-img pr-2 pt-2"
                      alt="User Pic"
                      src={
                        "http://localhost:8000" +
                        this.state.calendar.doctor.avatar
                      }
                    />
                  </div>
                  <div className="m-4 w-100">
                    <div className="form-row">
                      <div className="form-group col-md">
                        <strong> نام: </strong>
                        {"دکتر " +
                          this.state.calendar.doctor.first_name +
                          " " +
                          this.state.calendar.doctor.last_name}
                      </div>
                      <div className="form-group col-md">
                        <strong> تخصص: </strong>
                        {this.state.calendar.doctor.speciality}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md">
                        <strong> تلفن مطب: </strong>
                        <label>{this.state.calendar.doctor.phone_number}</label>
                      </div>
                      <div className="form-group col-md">
                        <strong> آدرس: </strong>
                        {this.state.calendar.doctor.address}
                      </div>
                    </div>
                    {this.state.calendar.doctor.bio ? (
                      <div className="form-row ">
                        <div className="form-group col-md">
                          <strong> توضیحات: </strong>
                          {this.state.calendar.doctor.bio}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {this.state.reserved ? (
              <div className="d-flex justify-content-center mt-5">
                <h2 className="text-info mt-4">این نوبت برای شما رزرو شده است!</h2>
              </div>
            ) : (
              <div className="mt-4">
                <h3>نوبت شما:</h3>
                <div className="card border-warning rounded shadow" style={{ backgroundColor: "rgba(253, 194, 0, 0.6)"}}>
                  <div className="m-4">
                    <div className="form-row">
                      <div className="form-group col-md">
                        <strong> روز: </strong>
                        <label>{this.state.calendar.day}</label>
                      </div>
                      <div className="form-group col-md">
                        <strong> ساعت شروع پذیرش: </strong>
                        {this.state.calendar.start_time}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md">
                        <strong> نوبت شما: </strong>
                        {this.state.turn}
                      </div>
                      <div className="form-group col-md">
                        <strong> زمان تقریبی نوبت شما: </strong>
                        {this.state.calendar.time}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-5">
                  <button
                    className="btn purple-btn z-depth-0 btn-lg mb-2"
                    onClick={this.onClick}
                  >
                    رزرو نوبت
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = (state) => ({
  isActive: state.sidebar.active,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Reserve);
