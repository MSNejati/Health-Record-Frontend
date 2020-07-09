import React, { Component } from "react";
import axios from "axios";
import { userAPI } from "../../apis/requests";
import "../../css/index.css";
import Loading from "../layout/Loading";
import { Link } from "react-router-dom";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import { connect } from "react-redux";

class listOfPatients extends Component {
  state = {
    patients: null,
    next: null,
    prev: null,
    search: null,
  };

  componentDidMount() {
    axios.get(userAPI("MANAGE_PATIENTS"), {}, {}).then((res) => {
      this.setState({
        patients: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  }

  prevPage = () => {
    axios.get(this.state.prev, {}, {}).then((res) => {
      this.setState({
        patients: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  nextPage = () => {
    axios.get(this.state.next, {}, {}).then((res) => {
      this.setState({
        patients: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  handelSerach = (e) => {
    e.preventDefault();
    let url = userAPI("MANAGE_PATIENTS");
    url += this.state.search ? "&search=" + this.state.search : "";
    axios.get(url, {}, {}).then((res) => {
      this.setState({
        patients: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { patients } = this.state;
    const patientsList = patients ? (
      patients.map((patient) => {
        return (
          <div
            className={
              this.props.isActive
                ? "my-card card text-right active"
                : "my-card card text-right"
            }
            key={patient.id}
          >
            <div className="card-body">
              <div className="form-row">
                <div className="col-md-2">
                  <img src={patient.avatar} alt="تصویر پروفایل"></img>
                </div>
                <div className="col-md-10">
                  <div className="form-row">
                    <div className="col-md-4">
                      <p>
                        <strong>نام: </strong> {patient.first_name}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <strong>نام خانوادگی: </strong> {patient.last_name}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <strong>کد ملی: </strong> {patient.user.username}
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-4">
                      <p>
                        <strong>شماره موبایل: </strong> {patient.mobile_number}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <strong>تاریخ تولد: </strong> {patient.birth_date}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <Link
                        to={"/patients/" + patient.id}
                        className="btn purple-btn float-left"
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
      <div
        className={
          this.props.isActive ? "wrapper admin-bg active" : "wrapper admin-bg"
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
              style={{ backgroundColor: "rgba(18, 186, 232, 0.8)" }}
            >
              <div className="card-body">
                <form className="align-items-center">
                  <div className="form-row justify-content-center d-flex w-50 mx-auto">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="inputQ"
                        name="search"
                        placeholder="جست و جو در لیست بیماران..."
                        onChange={this.onChange}
                        style={{
                          borderBottomLeftRadius: "0px",
                          borderBottomRightRadius: "5px",
                          borderTopLeftRadius: "0px",
                          borderTopRightRadius: "5px",
                        }}
                      />
                      <div className="input-group-prepend">
                        <button
                          type="button"
                          onClick={this.handelSerach}
                          className="btn purple-btn z-depth-0 float-left"
                          style={{
                            borderBottomLeftRadius: "5px",
                            borderTopLeftRadius: "5px",
                          }}
                        >
                          جست و جو
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-row justify-content-center d-flex">
                    <nav aria-label="Page navigation" className="w-100">
                      <ul
                        className="pagination justify-content-center mb-1"
                        style={{ marginRight: "-40px" }}
                      >
                        <li
                          className={
                            this.state.next ? "page-item" : "page-item disabled"
                          }
                        >
                          <button
                            type="button"
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
                            type="button"
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
                </form>
              </div>
            </div>
            <div
              className={
                this.props.isActive ? "text-right active" : "text-right"
              }
            >
              {patientsList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isActive: state.sidebar.active,
});

export default connect(mapStateToProps)(listOfPatients);
