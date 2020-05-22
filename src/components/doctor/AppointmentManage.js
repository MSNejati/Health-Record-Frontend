import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideBar from "../layout/SideBar";
import SideBarToggler from "../layout/SideBarToggler";
import Loading from "./../layout/Loading";
import { doctorAPI } from "./../../apis/requests";
import axios from "axios";
import Table from "./layout/Table";
import Item from "./layout/Item";

export class AppointmentManage extends Component {
  // static propTypes = {
  //     prop: PropTypes
  // }
  state = {
    advices: [],
    diseases: [],
    symptoms: [],
    medicines: [],
    patient: null,
    calendar: null,
    load: false,
    turn: null,
  };
  componentDidMount() {
    axios
      .get(doctorAPI("APPOINTMENTS", this.props.match.params.id))
      .then((res) => {
        this.setState({
          advices: res.data.advices,
          diseases: res.data.disease,
          symptoms: res.data.symptoms,
          medicines: res.data.medicines,
          patient: res.data.patient,
          calendar: res.data.calendar,
          turn: res.data.turn,
          load: true,
        });
      });
  }

  deleteItem = (id, name) => {
    let items = this.state[name];
    items = items.filter((x) => x.id !== id);
    this.setState({ [name]: items });
  };
  addItem = (item, name) => {
    let items = this.state[name];
    if (!items.find((x) => x.id === item.id)) {
      items.push(item);
      this.setState({ [name]: items });
    }
  };

  onSubmit = (e) => {
    var body = {
      advices: [],
      disease: [],
      symptoms: [],
      medicines: [],
    };
    this.state.advices.forEach((x) => body["advices"].push(x.id));
    this.state.diseases.forEach((x) => body["disease"].push(x.id));
    this.state.symptoms.forEach((x) => body["symptoms"].push(x.id));
    this.state.medicines.forEach((x) => body["medicines"].push(x.id));
    axios
      .patch(doctorAPI("APPOINTMENTS", this.props.match.params.id), body, {})
      .then((res) => console.log("00"));
  };
  render() {
    return this.state.load ? (
      <div className="d-flex">
        <SideBar />
        <div id="content" style={{ width: "100%" }}>
          <div className="">
            <SideBarToggler />
            <div className="d-flex text-right">
              <div
                className="d-flex"
                style={{
                  marginRight: "7%",
                  marginLeft: "7%",
                  width: "100%",
                }}
              >
                {/* <h3>بیمار:</h3> */}
                <div>
                  <img
                    className="rounded"
                    alt="User Pic"
                    src={this.state.patient.avatar}
                    style={{
                      width: "90px",
                      height: "100px",
                    }}
                  />
                </div>
                <div className="m-4 " style={{ width: "100%" }}>
                  <div className="form-row">
                    <div className="form-group col-md">
                      نام بیمار:
                      {" " +
                        this.state.patient.first_name +
                        " " +
                        this.state.patient.last_name}
                    </div>
                    <div className="form-group col-md">
                      نوبت:
                      {this.state.turn}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md">
                      زمان:
                      {this.state.calendar.start_time +
                        "  " +
                        this.state.calendar.day}
                    </div>
                    <div className="form-group col-md">
                      آدرس:
                      {this.state.patient.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ******************************** */}
            <div
              className="mt-4 text-right"
              style={{
                marginRight: "7%",
                marginLeft: "7%",
              }}
            >
              <h3>توصیه ها</h3>
              <div className="d-flex">
                <div
                  className="border ml-2 shadow-sm"
                  style={{
                    height: "250px",
                    width: "100%",
                  }}
                >
                  <Table url="ADVICES" add={this.addItem} name="advices" />
                </div>
                <div
                  className="border mr-2 p-2 shadow-sm"
                  style={{
                    height: "250px",
                    width: "100%",
                  }}
                >
                  {this.state.advices.map((item, index) => (
                    <Item
                      item={item}
                      key={index}
                      onDelete={() => this.deleteItem(item.id, "advices")}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* ******************************** */}
            <div
              className="mt-4 text-right"
              style={{
                marginRight: "7%",
                marginLeft: "7%",
              }}
            >
              <h3>بیماری ها</h3>
              <div className="d-flex">
                <div
                  className="border ml-2 shadow-sm"
                  style={{
                    height: "250px",
                    width: "100%",
                  }}
                >
                  <Table url="DISEASES" add={this.addItem} name="diseases" />
                </div>
                <div
                  className="border mr-2 p-2 shadow-sm"
                  style={{
                    height: "250px",
                    width: "100%",
                  }}
                >
                  {this.state.diseases.map((item, index) => (
                    <Item
                      item={item}
                      key={index}
                      onDelete={() => this.deleteItem(item.id, "diseases")}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* ************************************ */}
            <div
              className="mt-4 text-right"
              style={{
                marginRight: "7%",
                marginLeft: "7%",
              }}
            >
              <h3>علامت ها</h3>
              <div className="d-flex">
                <div
                  className="border ml-2 shadow-sm"
                  style={{
                    height: "250px",
                    width: "100%",
                  }}
                >
                  <Table url="SYMPTOMS" add={this.addItem} name="symptoms" />
                </div>
                <div
                  className="border mr-2 p-2 shadow-sm"
                  style={{
                    height: "250px",
                    width: "100%",
                  }}
                >
                  {this.state.symptoms.map((item, index) => (
                    <Item
                      item={item}
                      key={index}
                      onDelete={() => this.deleteItem(item.id, "symptoms")}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* ******************************** */}
            <div
              className="mt-4 text-right"
              style={{
                marginRight: "7%",
                marginLeft: "7%",
              }}
            >
              <h3>داروها</h3>
              <div className="d-flex">
                <div
                  className="border ml-2 shadow-sm"
                  style={{
                    height: "250px",
                    width: "100%",
                  }}
                >
                  <Table url="MEDICINES" add={this.addItem} name="medicines" />
                </div>
                <div
                  className="border mr-2 p-2 shadow-sm"
                  style={{
                    height: "250px",
                    width: "100%",
                  }}
                >
                  {this.state.medicines.map((item, index) => (
                    <Item
                      item={item}
                      key={index}
                      onDelete={() => this.deleteItem(item.id, "medicines")}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* ******************************** */}
            <div
              className="mt-4 text-right"
              style={{
                marginRight: "7%",
                marginLeft: "7%",
              }}
            >
              <div
                className="text-left"
                style={{
                  width: "100%",
                }}
              >
                <button
                  className="btn btn-primary btn-lg"
                  onClick={this.onSubmit}
                >
                  ذخیره تغییرات
                </button>
              </div>
            </div>
            <br />
            <br />
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

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentManage);
