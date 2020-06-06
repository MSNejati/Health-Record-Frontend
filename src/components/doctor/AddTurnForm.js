import React, { Component } from "react";
import axios from "axios";
import { doctorAPI } from "./../../apis/requests";
import "../../css/index.css";

const errorMsg = {
  day:
    "تاریخ انتخاب شده باید حداقل ۱ روز قبل یا حداکثر ۲۱ روز بعد از تاریخ کنونی باشد.",
};

export class AddTurnForm extends Component {
  state = {
    errors: null,
    day: null,
    startTime: "",
    total: null,
    msg: false,
  };

  static propTypes = {};

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: null });
    const body = {
      start_time: this.state.startTime,
      day: this.state.day,
      total: this.state.total,
    };
    axios
      .post(doctorAPI("CALENDARS"), body, {})
      .then((res) => {
        this.props.onSubmit();
        this.clear();
        this.setState({ msg: true });
        setTimeout(() => this.setState({ msg: false }), 5000);
      })
      .catch((err) => {
        this.setState({ errors: err.response });
      });
  };

  onChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value,
    });
  clear = () => {
    this.refs.startTime.value = "";
    this.refs.day.value = "";
    this.refs.total.value = "";
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <div className="form-group col-md text-right">
            <label htmlFor="day" className="float-right">
              تاریخ
            </label>
            <input
              type="date"
              className={
                this.state.errors ? "form-control is-invalid" : "form-control"
              }
              id="day"
              name="day"
              placeholder="تاریخ"
              onChange={this.onChange}
              required
              ref="day"
            />
            {this.state.errors ? (
              <div className="invalid-feedback">{errorMsg["day"]}</div>
            ) : null}
          </div>
          <div className="form-group col-md text-right">
            <label htmlFor="startTime" className="float-right">
              ساعت شروع
            </label>
            <input
              type="time"
              className="form-control"
              id="startTime"
              name="startTime"
              onChange={this.onChange}
              required
              placeholder="ساعت شروع ویزیت"
              ref="startTime"
            />
          </div>
          <div className="form-group col-md text-right">
            <label htmlFor="total" className="float-right">
              تعداد بیمار
            </label>

            <input
              type="number"
              min="1"
              className="form-control"
              id="total"
              name="total"
              placeholder="تعداد بیماران"
              onChange={this.onChange}
              required
              ref="total"
            />
          </div>
          {this.state.msg ? (
            <div className="alert alert-success alert-dismissible fade show">
              تقویم با موفقیت اضافه شد.
            </div>
          ) : (
            <br />
          )}
          <button
            type="submit"
            className="btn purple-btn z-depth-0 mb-2 float-left"
          >
            اضافه کردن
          </button>
        </div>
      </form>
    );
  }
}

export default AddTurnForm;
