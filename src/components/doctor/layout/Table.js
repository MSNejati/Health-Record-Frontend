import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { doctorAPI } from "./../../../apis/requests";
import Dialog from "./Dialog";
import "../../../css/sidebar.css";

const fields = {
  advices: [
    { name: "name", type: "text" },
    { name: "description", type: "text" },
  ],
  diseases: [{ name: "name", type: "text" }],
  symptoms: [
    { name: "name", type: "text" },
    { name: "value", type: "text" },
  ],
  medicines: [
    { name: "name", type: "text" },
    { name: "duration", type: "time" },
  ],
};

const translate = {
  name: "نام",
  description: "توضیحات",
  value: "مقدار",
  duration: "مدت",
  advices: "توصیه",
  symptoms: "علامت ها",
  medicines: "داروها",
  diseases: "بیماری ها",
};

export default class Table extends Component {
  static propTypes = {
    name: PropTypes.string,
    add: PropTypes.func,
  };
  state = {
    data: null,
    next: null,
    prev: null,
    curr: null,
    search: "",
  };
  componentDidMount() {
    axios.get(doctorAPI(this.props.url), {}, {}).then((res) => {
      this.setState({
        data: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  }

  prevPage = () => {
    axios.get(this.state.prev, {}, {}).then((res) => {
      this.setState({
        data: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  nextPage = () => {
    axios.get(this.state.next, {}, {}).then((res) => {
      this.setState({
        data: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };

  handelSerach = (e) => {
    e.preventDefault();
    let url = doctorAPI(this.props.url);
    url += this.state.search ? "&search=" + this.state.search : "";

    axios.get(url, {}, {}).then((res) => {
      this.setState({
        data: res.data.results,
        next: res.data.next,
        prev: res.data.previous,
      });
    });
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    return this.state.data ? (
      <div>
        <div className="p-2 bg-light">
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              name="search"
              onChange={this.onChange}
            />
            <button className="btn" onClick={this.handelSerach}>
              &#128269;
            </button>
            <a
              className={this.state.next ? "btn" : "btn disabled"}
              onClick={this.nextPage}
            >
              &lt;
            </a>
            <a
              className={this.state.prev ? "btn" : "btn disabled"}
              onClick={this.prevPage}
            >
              &gt;
            </a>
            <button
              className="btn"
              data-toggle="modal"
              data-target={"#" + this.props.name}
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              +
            </button>
            <Dialog
              id={this.props.name}
              fields={fields[this.props.name]}
              url={doctorAPI(this.props.url)}
            />
          </div>
        </div>
        <table
          className="table table-hover text-center table-sm"
          cellSpacing="0"
          width="100%"
        >
          <thead className="green-sb text-light">
            <tr>
              <th scope="col" className="th-sm">
                #
              </th>
              {fields[this.props.name].map((f, index) => (
                <th scope="col" className="th-sm" key={index}>
                  {translate[f.name]}
                </th>
              ))}
              <th scope="col" className="th-sm"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((row, index) => (
              <tr key={row.id} className="border-bottom">
                <td>{index + 1}</td>
                {fields[this.props.name].map((f, index) => (
                  <td scope="col" className="th-sm" key={index}>
                    {row[f.name]}
                  </td>
                ))}
                <td>
                  <button
                    className="btn purple-btn-sm z-depth-0 btn-sm"
                    onClick={() => this.props.add(row, this.props.name)}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <span>کمی صبر کنید.</span>
    );
  }
}
