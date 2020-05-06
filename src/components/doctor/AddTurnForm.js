import React, { Component } from "react";
import axios from "axios";
import { doctorAPI } from "./../../apis/requests";

export class AddTurnForm extends Component {
  state = {
    startTime: "",
    endTime: "",
  };
  static propTypes = {};
  onSubmit = (e) => {
    e.preventDefault();
    const body = {
      start_time: this.state.startTime,
      end_time: this.state.endTime,
    };
    axios.post(doctorAPI("TURNS"), body, {}).then((res) => {
      this.props.onSubmit();
      this.refs.start.value = "";
      this.refs.end.value = "";
    });
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <div>
        <div className="card p-2 ">
          <form className="need-validated " onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="form-group col-sm-0 text-right">
                <label>زمان شروع</label>
                <input
                  type="datetime-local"
                  className="form-control list-inline-item"
                  id="startTime"
                  name="startTime"
                  onChange={this.onChange}
                  required
                  ref="start"
                />
              </div>
              <div className="form-group col-sm-0 text-right">
                <label>زمان پایان</label>

                <input
                  type="datetime-local"
                  className="form-control list-inline-item"
                  id="endTime"
                  name="endTime"
                  onChange={this.onChange}
                  required
                  format-value="yyyy-MM-ddTHH:mm"
                  ref="end"
                />
              </div>
            </div>
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                اضافه کردن
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddTurnForm;
