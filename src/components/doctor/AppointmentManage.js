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
import Swal from "sweetalert2";

function Row(props) {
  return (
    <div
      className="mt-4 text-right"
      style={{
        marginRight: "7%",
        marginLeft: "7%",
      }}
    >
      <h3>{props.header}</h3>
      <div className="d-flex">
        <div
          className="border ml-2 shadow-sm"
          style={{
            height: "270px",
            width: "50%",
            overflowX: "auto",
            overflowY: "auto",
          }}
        >
          <Table url={props.url} add={props.addItem} name={props.name} />
        </div>
        <div
          className="border mr-2 p-2 shadow-sm"
          style={{
            height: "270px",
            width: "50%",
          }}
        >
          {props.items.map((item, index) => (
            <Item
              item={item}
              key={index}
              onDelete={() => props.deleteItem(item.id, props.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
      .then((res) =>
        Swal.fire({
          icon: "success",
          title: "تغییرات با موفقیت ذخیره شد.",
          showConfirmButton: false,
          timer: 2000,
        })
      );
  };

  render() {
    return this.state.load ? (
      <div className="d-flex bg-light">
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
            <Row
              header="توصیه ها"
              name="advices"
              url="ADVICES"
              items={this.state.advices}
              deleteItem={this.deleteItem}
              addItem={this.addItem}
            />
            {/* ******************************** */}
            <Row
              header="بیماری ها"
              name="diseases"
              url="DISEASES"
              items={this.state.diseases}
              deleteItem={this.deleteItem}
              addItem={this.addItem}
            />
            {/* ************************************ */}
            <Row
              header="علامت ها"
              name="symptoms"
              url="SYMPTOMS"
              items={this.state.symptoms}
              deleteItem={this.deleteItem}
              addItem={this.addItem}
            />
            {/* ******************************** */}
            <Row
              header="دارو ها"
              name="medicines"
              url="MEDICINES"
              items={this.state.medicines}
              deleteItem={this.deleteItem}
              addItem={this.addItem}
            />
            {/* ******************************** */}
            <div className="text-center">
              <button
                className="btn btn-lg btn-primary m-4"
                onClick={this.onSubmit}
              >
                ثبت تغییرات
              </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentManage);
