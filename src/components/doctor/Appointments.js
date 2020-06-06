import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../layout/SideBar";
import SideBarToggler from "../layout/SideBarToggler";
import Loading from "./../layout/Loading";
import { doctorAPI } from "./../../apis/requests";
import axios from "axios";
import "../../css/index.css";

export class Appointments extends Component {
  state = {
    appointments: null,
    next: null,
    prev: null,
    start: null,
    end: null,
    search: null,
    done: null,
    url: null,
  };

  async componentDidMount() {
    await this.setState({
      url:
        doctorAPI("APPOINTMENTS") +
        this.props.location.search.replace("?", "&"),
    });
    axios.get(this.state.url, {}, {}).then((res) => {
      this.setState({
        appointments: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  }

  prevPage = () => {
    axios.get(this.state.prev, {}, {}).then((res) => {
      this.setState({
        appointments: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  nextPage = () => {
    axios.get(this.state.next, {}, {}).then((res) => {
      this.setState({
        appointments: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  handelSerach = (e) => {
    e.preventDefault();
    let url = this.state.url;

    url += this.state.start ? "&start=" + this.state.start : "";
    url += this.state.end ? "&end=" + this.state.end : "";
    url += this.state.search ? "&search=" + this.state.search : "";
    url += this.state.done ? "&done=" + this.state.done : "";

    axios.get(url, {}, {}).then((res) => {
      this.setState({
        appointments: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return this.state.appointments ? (
      <div
        className={
          this.props.isActive ? "wrapper doctor-bg active" : "wrapper doctor-bg"
        }
      >
        <SideBar />
        <div id="content">
          <SideBarToggler />
          <div className="page-content">
            <div
              className={
                this.props.isActive
                  ? "my-card card text-right active"
                  : "my-card card text-right"
              }
            >
              <div className="card-body">
                <form onSubmit={this.handelSerach}>
                  <div className="form-row">
                    <div className="form-group col-md-4 text-right">
                      <label className="float-right" htmlFor="inputQ">
                        نام بیمار
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputQ"
                        name="search"
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group col-md-4 text-right">
                      <label className="float-right" htmlFor="inputStart">
                        از تاریخ:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="inputStart"
                        name="start"
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group col-md-4 text-right">
                      <label className="float-right" htmlFor="inputEnd">
                        تا تاریخ:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="inputEnd"
                        name="end"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <select
                    className="border rounded"
                    style={{ fontSize: "12pt" }}
                    name="done"
                    onChange={this.onChange}
                  >
                    <option value={null}>همه</option>
                    <option value="false">انجام نشده ها</option>
                    <option value="true">انجام شده ها</option>
                  </select>
                  <button
                    type="submit"
                    className="btn purple-btn z-depth-0 mb-2 float-left"
                  >
                    جست و جو
                  </button>
                </form>
              </div>
            </div>
            <div
              className={
                this.props.isActive
                  ? "my-card card text-right active"
                  : "my-card card text-right"
              }
            >
              <h5 className="card-header text-body text-center pt-3 font-weight-bold">
                لیست نوبت های یافت شده
              </h5>
              <div className="card-body scrollable">
                <div className="form-row col-md">
                  <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">روز</th>
                        <th scope="col">ساعت</th>
                        <th scope="col">نام بیمار</th>
                        <th scope="col">نوبت</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.appointments.map((app, index) => (
                        <tr key={app.id} className="border-bottom">
                          <td>{index + 1}</td>
                          <td style={{ direction: "ltr" }}>
                            {app.calendar.day}
                          </td>
                          <td style={{ direction: "ltr" }}>
                            {app.calendar.start_time}
                          </td>
                          <td>
                            {app.patient.first_name +
                              " " +
                              app.patient.last_name}
                          </td>
                          <td>{app.turn}</td>
                          <td>{app.done ? "انجام شده" : "انجام نشده"}</td>
                          <td>
                            <button
                              className="btn purple-btn z-depth-0"
                              onClick={() => {
                                this.props.history.push("app/" + app.id);
                              }}
                            >
                              {app.done ? "ویرایش" : "انجام"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="w-100 d-flex justify-content-center mb-4">
                    {this.state.appointments.length === 0 ? (
                      <strong>نوبتی یافت نشد.</strong>
                    ) : null}
                  </div>
                  <nav aria-label="Page navigation" className="w-100">
                    <ul
                      className="pagination justify-content-center"
                      style={{ marginRight: "-40px" }}
                    >
                      <li
                        className={
                          this.state.next ? "page-item" : "page-item disabled"
                        }
                      >
                        <button
                          className="page-link"
                          onClick={() => {
                            this.nextPage();
                          }}
                        >
                          &lt; بعدی
                        </button>
                      </li>
                      <li
                        className={
                          this.state.prev ? "page-item" : "page-item disabled"
                        }
                      >
                        <button
                          className="page-link"
                          onClick={() => {
                            this.prevPage();
                          }}
                        >
                          قبلی &gt;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
