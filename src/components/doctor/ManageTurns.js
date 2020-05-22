import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { doctorAPI } from "./../../apis/requests";
import AddTurnForm from "./AddTurnForm";
import Loading from "./../layout/Loading";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import "../../css/register.css";
import Swal from "sweetalert2";

export class ManageTurns extends Component {
  state = {
    turns: null,
    next: null,
    prev: null,
    current: null,
  };

  componentDidMount() {
    axios
      .get(
        doctorAPI("CALENDARS"),
        {
          params: {
            ordering: "day,start_time",
          },
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
  }

  parser = (time) => {
    time = time.replace("T", ", ");
    time = time.replace("Z", "");
    return time;
  };

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
    axios.get(this.state.current, {}, {}).then((res) => {
      this.setState({
        turns: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
      Swal.fire({
        icon: "success",
        title: "نوبت با موفقیت افزوده شد",
        showConfirmButton: false,
        timer: 2000,
      });
    });
  };

  render() {
    return this.state.turns ? (
      <div className="wrapper">
        <SideBar />
        <div id="content">
          <SideBarToggler />
          <div className="my-Register-page">
            <div
              className={
                this.props.isActive
                  ? "add-turns-card card text-right active"
                  : "add-turns-card card text-right"
              }
            >
              <h5 className="card-header text-body text-center pt-3 font-weight-bold">
                افزودن نوبت
              </h5>
              <div className="card-body">
                <AddTurnForm onSubmit={this.getPage} />
              </div>
            </div>
            <div
              className={
                this.props.isActive
                  ? "add-turns-card card text-right active"
                  : "add-turns-card card text-right"
              }
            >
              <h5 className="card-header text-body text-center pt-3 font-weight-bold">
                لیست نوبت های ثبت شده
              </h5>
              <table
                className="table table-striped"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">روز</th>
                    <th scope="col">ساعت شروع</th>
                    <th scope="col">تعداد نوبت تعریف شده</th>
                    <th scope="col">تعداد نوبت باقیمانده</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.turns.map((turn, index) => (
                    <tr key={turn.id}>
                      <td>{turn.id}</td>
                      <td style={{ direction: "ltr" }}>
                        {this.parser(turn.day)}
                      </td>
                      <td style={{ direction: "ltr" }}>
                        {this.parser(turn.start_time)}
                      </td>
                      <td style={{ direction: "ltr" }}>{turn.total}</td>
                      <td style={{ direction: "ltr" }}>{turn.remained}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            axios
                              .delete(doctorAPI("CALENDARS", turn.id), {}, {})
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
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
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
