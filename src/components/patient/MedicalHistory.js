import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../layout/SideBar";
import SideBarToggler from "../layout/SideBarToggler";
import Loading from "./../layout/Loading";
import { patientAPI } from "./../../apis/requests";
import axios from "axios";
import "../../css/index.css";
import HistoryDialog from "../layout/HistoryDialog";

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
    appointment: null,
  };

  async componentDidMount() {
    axios.get(patientAPI("HISTORY"), {}, {}).then((res) => {
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
    let url = patientAPI("HISTORY");

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

  handleShowHistory = (id) => {
    axios.get(patientAPI("HISTORY", id), {}, {}).then((res) => {
      console.log(res);
      this.setState({
        appointment: res.data,
      });
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.done);
  };

  render() {
    return this.state.appointments ? (
      <div
        className={
          this.props.isActive
            ? "wrapper patient-bg active"
            : "wrapper patient-bg"
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
                        نام پزشک
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
                  <div className="form-row">
                    <div className="form-group col-md">
                      <select
                        className="border rounded"
                        name="done"
                        onChange={this.onChange}
                      >
                        <option value={null}>همه</option>
                        <option value="false">انجام نشده ها</option>
                        <option value="true">انجام شده ها</option>
                      </select>
                    </div>

                    <div className="form-group col-md">
                      <button
                        type="submit"
                        className="btn purple-btn z-depth-0 mb-2 float-left"
                      >
                        جست و جو
                      </button>
                    </div>
                  </div>
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
                تاریخچه نوبت ها
              </h5>
              <div className="card-body scrollable">
                <div className="form-row col-md">
                  <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">تاریخ</th>
                        <th scope="col">نام پزشک</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.appointments.map((app, index) => (
                        <tr key={app.id} className="border-bottom">
                          <td>{index + 1}</td>
                          <td>{app.calendar.day}</td>
                          <td>
                            {app.calendar.doctor.first_name +
                              " " +
                              app.calendar.doctor.last_name}
                          </td>
                          <td>
                            {app.done === "true" ? (
                              <button
                                className="btn btn-sm purple-btn-sm z-depth-0"
                                type="button"
                                data-toggle="modal"
                                data-target="#historyDialog"
                                onClick={() => {
                                  this.handleShowHistory(app.id);
                                }}
                              >
                                نمایش
                              </button>
                            ) : (
                              <button
                                className="btn btn-sm purple-outline-btn z-depth-0"
                                type="button"
                                data-toggle="modal"
                                data-target="#historyDialog"
                                // disabled
                                onClick={() => {
                                  this.handleShowHistory(app.id);
                                }}
                              >
                                نمایش
                              </button>
                            )}
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
        <div className="overlay"></div>
        <HistoryDialog appointment={this.state.appointment}/>
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
