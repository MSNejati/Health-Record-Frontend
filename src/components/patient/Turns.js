import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import { patientAPI } from "./../../apis/requests";
import axios from "axios";
import Loading from "./../layout/Loading";

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
      <div className="d-flex">
        <SideBar />
        <div id="content" style={{ width: "100%" }}>
          <div className="">
            <SideBarToggler />
            <div className="d-flex justify-content-center pb-3">
              <form
                onSubmit={this.handelSerach}
                className="border p-4 bg-light"
                style={{ borderRadius: "0.3em" }}
              >
                <div className="form-row">
                  <div className="form-group col-md">
                    <label className="float-right" htmlFor="inputQ">
                      نام پزشک یا تخصص
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputQ"
                      name="search"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label className="float-right" htmlFor="inputStart">
                      نزدیک ترین زمان:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="inputStart"
                      name="start"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group col-md">
                    <label className="float-right" htmlFor="inputEnd">
                      دورترین زمان:
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
                <button type="submit" className="btn btn-primary btn-md">
                  جست و جو
                </button>
              </form>
            </div>
          </div>
          <div style={{ margin: "4%", marginTop: "0" }}>
            <div className="" style={{ minHeight: "400px" }}>
              <table className="table table-striped table-hover text-center">
                <thead className="bg-warning">
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
                  {this.state.turns.length == 0 ? (
                    <p className="text-center">نوبتی یافت نشد.</p>
                  ) : null}
                  {this.state.turns.map((turn, index) => (
                    <tr key={turn.id} className="border-bottom">
                      <td>{index + 1}</td>
                      <td style={{ direction: "ltr" }}>{turn.day}</td>
                      <td style={{ direction: "ltr" }}>{turn.start_time}</td>
                      <td>
                        {turn.doctor.first_name + " " + turn.doctor.last_name}
                      </td>
                      <td>{turn.remained}</td>
                      <td>{turn.doctor.speciality}</td>
                      <td>
                        <button
                          className="btn btn-info btn-sm"
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
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
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
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Turns);
