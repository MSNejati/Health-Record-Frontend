import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { doctorAPI, patientAPI } from "./../../apis/requests";
import AddTurnForm from "./AddTurnForm";
import Loading from "./../layout/Loading";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import "../../css/index.css";
import "../../css/sidebar.css";
import Swal from "sweetalert2";

export class ManageTurns extends Component {
  state = {
    turns: null,
    next: null,
    prev: null,
    current: null,
    params: { start: "", end: "", delta_day: "" },
  };

  componentDidMount() {
    axios.get(doctorAPI("CALENDARS"), {}, {}).then((res) => {
      this.setState({
        turns: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
        current: doctorAPI("CALENDARS"),
      });
    });
  }

  nextPage = () => {
    axios.get(this.state.next, {}, {}).then((res) => {
      this.setState({
        current: this.state.next,
        turns: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  prevPage = () => {
    axios.get(this.state.prev, {}, {}).then((res) => {
      this.setState({
        current: this.state.prev,
        turns: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  getPage = () => {
    axios
      .get(
        this.state.current,
        {
          params: this.state.params,
        },
        {}
      )
      .then((res) => {
        this.setState({
          turns: res.data.results,
          next: res.data.next,
          prev: res.data.previous,
        });
        // Swal.fire({
        //   icon: "success",
        //   title: "نوبت با موفقیت افزوده شد",
        //   showConfirmButton: false,
        //   timer: 2000,
        // });
      });
  };

  onParamsChange = (e) => {
    var params = this.state.params;
    params[e.target.name] = e.target.value;
    this.setState({ params: params });
  };
  submitFilter = () => {
    axios
      .get(
        doctorAPI("CALENDARS"),
        {
          params: this.state.params,
        },
        {}
      )
      .then((res) => {
        this.setState({
          turns: res.data.results,
          next: res.data.next,
          prev: res.data.previous,
          current: doctorAPI("CALENDARS"),
        });
      });
  };
  render() {
    return this.state.turns ? (
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
              <h5 className="card-header text-body text-center pt-3 font-weight-bold">
                لیست نوبت های ثبت شده
              </h5>
              <div
                className="d-sm-inline-flex p-2 justify-content-center"
                style={{ whiteSpace: "nowrap" }}
              >
                <input
                  placeholder="چند روز آینده"
                  type="number"
                  style={{ maxWidth: "160px" }}
                  className="rounded border"
                  value={this.state.params.delta_day}
                  onChange={this.onParamsChange}
                  name="delta_day"
                />
                <input
                  placeholder="حد پایین زمانی"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  type="text"
                  style={{ maxWidth: "160px" }}
                  className="rounded border"
                  value={this.state.params.start}
                  onChange={this.onParamsChange}
                  name="start"
                />
                <input
                  placeholder="حد بالا زمانی"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  type="text"
                  style={{ maxWidth: "160px" }}
                  className="rounded border"
                  value={this.state.params.end}
                  onChange={this.onParamsChange}
                  name="end"
                />
                <button
                  className="btn btn-sm purple-btn m-1"
                  onClick={this.submitFilter}
                >
                  اعمال فیلتر
                </button>
                {/* <button className="btn btn-sm btn-dark m-1">تایم لاین</button> */}
              </div>
              <div className="card-body scrollable">
                <div className="form-row col-md">
                  <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">روز</th>
                        <th scope="col">ساعت شروع</th>
                        <th scope="col">تعداد نوبت تعریف شده</th>
                        <th scope="col">تعداد نوبت باقیمانده</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.turns.map((turn, index) => (
                        <tr key={turn.id}>
                          <td>{index + 1}</td>
                          <td style={{ direction: "ltr" }}>{turn.day}</td>
                          <td style={{ direction: "ltr" }}>
                            {turn.start_time}
                          </td>
                          <td style={{ direction: "ltr" }}>{turn.total}</td>
                          <td style={{ direction: "ltr" }}>{turn.remained}</td>
                          <td>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => {
                                this.props.history.push(
                                  "/doctor/app?calendar=" + turn.id
                                );
                              }}
                            >
                              قرارها
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn exit-button btn-sm"
                              onClick={() => {
                                axios
                                  .delete(
                                    doctorAPI("CALENDARS", turn.id),
                                    {},
                                    {}
                                  )
                                  .then((res) => {
                                    Swal.fire({
                                      icon: "success",
                                      title: "نوبت با موفقیت حذف شد",
                                      showConfirmButton: false,
                                      timer: 2000,
                                    });
                                    setTimeout(() => {
                                      window.location.reload();
                                    }, 2000);
                                  });
                              }}
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                        <button className="page-link" onClick={this.nextPage}>
                          &lt; بعدی
                        </button>
                      </li>
                      <li
                        className={
                          this.state.prev ? "page-item" : "page-item disabled"
                        }
                      >
                        <button className="page-link" onClick={this.prevPage}>
                          قبلی &gt;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary btn-lg m-3 float-left"
                  data-toggle="modal"
                  data-target="#modal"
                >
                  افزودن تقویم
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="modal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content p-3">
              <AddTurnForm onSubmit={this.getPage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTurns);
