import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import { patientAPI } from "./../../apis/requests";
import axios from "axios";
import Loading from "./../layout/Loading";
import "../../css/index.css";

export class Turns extends Component {
  state = {
    turns: null,
    next: null,
    prev: null,
    start: null,
    end: null,
    search: null,
  };

  componentDidMount() {
    axios.get(patientAPI("TURNS"), {}, {}).then((res) => {
      this.setState({
        turns: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  }

  prevPage = () => {
    axios.get(this.state.prev, {}, {}).then((res) => {
      this.setState({
        turns: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  nextPage = () => {
    axios.get(this.state.next, {}, {}).then((res) => {
      this.setState({
        turns: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  handelSerach = (e) => {
    e.preventDefault();
    let url = patientAPI("TURNS");

    url += this.state.start ? "&start=" + this.state.start : "";
    url += this.state.end ? "&end=" + this.state.end : "";
    url += this.state.search ? "&search=" + this.state.search : "";

    axios.get(url, {}, {}).then((res) => {
      this.setState({
        turns: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return this.state.turns ? (
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
                        نام پزشک یا تخصص:
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
                        <th scope="col">پزشک</th>
                        <th scope="col">نوبت های باقی مانده</th>
                        <th scope="col">تخصص</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.turns.map((turn, index) => (
                        <tr key={turn.id} className="border-bottom">
                          <td>{index + 1}</td>
                          <td>{turn.day}</td>
                          <td>{turn.start_time}</td>
                          <td>
                            {turn.doctor.first_name +
                              " " +
                              turn.doctor.last_name}
                          </td>
                          <td>{turn.remained}</td>
                          <td>{turn.doctor.speciality}</td>
                          <td>
                            <button
                              className="btn purple-btn z-depth-0"
                              onClick={() => {
                                this.props.history.push("turns/" + turn.id);
                              }}
                            >
                              رزرو
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="w-100 d-flex justify-content-center mb-4">
                    {this.state.turns.length === 0 ? (
                      <strong>نوبتی یافت نشد.</strong>
                    ) : null}
                  </div>
                  <nav aria-label="Page navigation" className="w-100">
                    <ul
                      className="pagination justify-content-center pagination-card"
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

export default connect(mapStateToProps, mapDispatchToProps)(Turns);
