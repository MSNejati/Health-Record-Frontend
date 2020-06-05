import React, { Component } from "react";
import axios from "axios";
import { doctorAPI } from "./../../../apis/requests";

const translate = {
  name: "نام",
  advices: "توصیه",
  description: "توضیحات",
  duration: "مدت(dd hh:mm:ss)",
  value: "مقدار",
  symptoms: "علامت",
  medicines: "دارو",
  diseases: "بیماری",
};

export class Dialog extends Component {
  static propTypes = {};
  state = {
    body: { name: "", description: "", value: "", duration: "" },
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.editId) {
      axios
        .put(doctorAPI(this.props.url, this.props.editId), this.state.body, {})
        .then((res) => this.props.load());
    } else {
      axios
        .post(doctorAPI(this.props.url), this.state.body, {})
        .then((res) => this.props.load());
    }
  };
  onChange = (e) => {
    let body = this.state.body;
    body[e.target.name] = e.target.value;
    this.setState({ body: body });
  };
  componentDidUpdate(nextProps) {
    if (nextProps.editId !== this.props.editId) {
      axios
        .get(doctorAPI(this.props.url, this.props.editId))
        .then((res) => this.setState({ body: res.data }));
    }
  }
  render() {
    return (
      <div
        className="modal fade text-right"
        id={this.props.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info text-light">
              <h5 className="modal-title" id="exampleModalLabel">
                افزودن {translate[this.props.id]}
              </h5>
              <div>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <form onSubmit={this.onSubmit}>
                {this.props.fields
                  ? this.props.fields.map((f, index) => (
                      <div className="form-grodoctorAPIup" key={index}>
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          {translate[f.name]}:
                        </label>
                        <input
                          name={f.name}
                          type={f.type}
                          className="form-control"
                          required
                          value={this.state.body[f.name]}
                          onChange={this.onChange}
                          pattern={
                            f.name === "duration"
                              ? "[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}"
                              : null
                          }
                          style={
                            f.name === "duration" ? { direction: "ltr" } : null
                          }
                        />
                      </div>
                    ))
                  : null}
                <button
                  type="submit"
                  className="btn btn-primary float-left m-2"
                >
                  {this.props.editId ? "ویرایش" : "افزودن"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
