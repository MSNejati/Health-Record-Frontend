import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { doctorAPI } from "./../../apis/requests";
import AddTurnForm from "./AddTurnForm";
import Loading from "./../layout/Loading";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";

export class ManageTurns extends Component {
  state = { isActive: false, turns: null, data: null, next: null, prev: null };
  handleToggleSidebar = (event) => {
    event.preventDefault();
    this.setState({
      isActive: !this.state.isActive,
    });
  };
  componentDidMount() {
    axios.get(doctorAPI("TURNS"), {}, {}).then((res) => {
      this.setState({
        turns: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
        current: doctorAPI("TURNS"),
      });
    });
  }
  parser = (time) => {
    time = time.replace("T", ", ");
    time = time.replace("Z", "");
    return time;
  };
  getPage = () => {
    axios.get(this.state.current, {}, {}).then((res) => {
      this.setState({
        turns: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
        current: doctorAPI("TURNS"),
      });
    });
  };
  render() {
    return this.state.turns ? (
      <div className="d-flex" style={{ backgroundColor: "#03fcca" }}>
        <SideBar />
        <div id="content" style={{ width: "100%" }}>
          <SideBarToggler />
          <div style={{ margin: "2em" }}>
            <div className="card" style={{ minHeight: "690px" }}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">زمان آغاز</th>
                    <th scope="col">زمان پایان</th>
                    <th scope="col">مریض</th>
                    <th scope="col">قبول شده</th>
                    <th scope="col">ملاقات شده</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.turns.map((turn, index) => (
                    <tr key={turn.id}>
                      <td>{turn.id}</td>
                      <td style={{ direction: "ltr" }}>
                        {this.parser(turn.start_time)}
                      </td>
                      <td style={{ direction: "ltr" }}>
                        {this.parser(turn.end_time)}
                      </td>
                      <td>{turn.patient ? turn.patient : "ندارد"}</td>
                      <td>{turn.accepted ? "بله" : "خیر"}</td>
                      <td>{turn.visited ? "بله" : "خیر"}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            axios
                              .delete(doctorAPI("TURNS", turn.id), {}, {})
                              .then((res) => window.location.reload());
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
                    <button
                      className="page-link"
                      onClick={() => {
                        // this.state.current = this.state.next;
                        this.setState({ current: this.state.next });

                        this.getPage();
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
                        // this.state.current = this.state.prev;
                        this.setState({ current: this.state.prev });
                        this.getPage();
                      }}
                    >
                      قبلی &gt;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <AddTurnForm onSubmit={this.getPage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTurns);
