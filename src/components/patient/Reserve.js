import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { patientAPI } from "./../../apis/requests";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import axios from "axios";
import Loading from "./../layout/Loading";

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
      <div className="d-flex">
        <SideBar />
        <div id="content" style={{ width: "100%" }}>
          <SideBarToggler />

          <div
            className="mt-4 text-right"
            style={{ margin: "4%", marginTop: "0" }}
          >
            <div>
              <h3>پزشک:</h3>
              <div className="card rounded">
                <div className="d-flex flex-row m-2">
                  <div>
                    <img
                      className="rounded"
                      alt="User Pic"
                      src={
                        "http://localhost:8000" +
                        this.state.calendar.doctor.avatar
                      }
                      style={{
                        width: "90px",
                        height: "100px",
                      }}
                    />
                  </div>
                  <div className="m-4 " style={{ width: "100%" }}>
                    <div className="form-row">
                      <div className="form-group col-md">
                        نام:
                        {"دکتر " +
                          this.state.calendar.doctor.first_name +
                          " " +
                          this.state.calendar.doctor.last_name}
                      </div>
                      <div className="form-group col-md">
                        تخصص:
                        {this.state.calendar.doctor.speciality}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md">
                        تلفن مطب:{this.state.calendar.doctor.phone_number}
                        &#9743;
                      </div>
                      <div className="form-group col-md">
                        آدرس:
                        {this.state.calendar.doctor.address}
                      </div>
                    </div>
                    {this.state.calendar.doctor.bio ? (
                      <div className="form-row ">
                        <div className="form-group col-md">
                          &#9432; {this.state.calendar.doctor.bio}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3>نوبت شما:</h3>
              <div className="card rounded">
                <div className="d-flex flex-row m-2">
                  <div className="m-4 " style={{ width: "100%" }}>
                    <div className="form-row">
                      <div className="form-group col-md">
                        روز:
                        {this.state.calendar.day}
                      </div>
                      <div className="form-group col-md">
                        ساعت شروع پذیرش:
                        {this.state.calendar.start_time}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md">
                        نوبت شما:{this.state.turn}
                      </div>
                      <div className="form-group col-md">
                        زمان تقریبی نوبت شما:
                        {this.state.turn}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
              {this.state.reserved ? (
                <h2 className="text-info">این نوبت برای شما رزرو شده.</h2>
              ) : (
                <button
                  className="btn btn-primary btn-lg"
                  onClick={this.onClick}
                >
                  رزرو نوبت
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Reserve);
