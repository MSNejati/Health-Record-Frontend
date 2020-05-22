import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const translate = {
  name: "نام",
  advices: "توصیه",
  description: "توضیحات",
  duration: "مدت",
  value: "مقدار",
  advices: "توصیه",
  symptoms: "علامت",
  medicines: "دارو",
  diseases: "بیماری",
};

export class Dialog extends Component {
  static propTypes = {};
  state = { name: "", description: "", value: "", duration: "" };
  onSubmit = (e) => {
    e.preventDefault();
    axios.post(this.props.url, this.state, {});
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
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
                      <div className="form-group" key={index}>
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
                          value={this.state[f.name]}
                          onChange={this.onChange}
                        />
                      </div>
                    ))
                  : null}
                <button type="submit" className="btn btn-primary float-left">
                  افزودن
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
