import React, { Component } from "react";
import axios from "axios";
import { userAPI } from "./../../apis/requests";

export class ChangePassword extends Component {
  static propTypes = {
    // prop: PropTypes
  };
  constructor(props) {
    super(props);
    this.state = {
      old_password: "",
      new_password1: "",
      new_password2: "",
      errors: null,
      validateClass: "",
      msg: false,
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        userAPI("CHANGE_PASSWORD"),
        {
          old_password: this.state.old_password,
          new_password1: this.state.new_password1,
          new_password2: this.state.new_password2,
        },
        {}
      )
      .then((res) =>
        this.setState({
          errors: null,
          validateClass: "",
          msg: res.data.message,
        })
      )
      .catch((e) =>
        this.setState({
          errors: e.response.data,
          validateClass: "is-invalid",
          msg: false,
        })
      );
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="changePassDialog"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  تغییر رمز عبور
                </h5>
                <div>
                  <button
                    type="button"
                    className="close float-left"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="modal-body">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPass1"
                      className="col-sm-3 col-form-label"
                    >
                      رمز قبلی:
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className={"form-control " + this.state.validateClass}
                        id="inputPass1"
                        required
                        name="old_password"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPass21"
                      className="col-sm-3 col-form-label"
                    >
                      رمز جدید:
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className={"form-control " + this.state.validateClass}
                        id="inputPass21"
                        required
                        name="new_password1"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPass22"
                      className="col-sm-3 col-form-label"
                    >
                      رمز جدید:
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className={"form-control " + this.state.validateClass}
                        id="inputPass22"
                        required
                        name="new_password2"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div>
                    {this.state.errors ? (
                      <div>
                        <div>
                          {this.state.errors.old_password ? (
                            <div className="text-danger">
                              {" "}
                              {this.state.errors.old_password[0]}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          {this.state.errors.non_field_errors ? (
                            <div className="text-danger">
                              {this.state.errors.non_field_errors[0]}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : this.state.msg ? (
                      <div className="text-success">{this.state.msg}</div>
                    ) : null}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      data-dismiss="modal"
                    >
                      لغو
                    </button>
                    <button type="submit" className="btn btn-outline-primary">
                      ذخیره
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
