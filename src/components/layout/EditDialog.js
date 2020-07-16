import React, { Component } from "react";
import axios from "axios";

const dict = {
  user_name: "نام کاربری",
  birth_date: "تاریخ تولد",
  first_name: "نام",
  last_name: "نام خانوادگی",
  address: "آدرس",
  mobile_number: "تلفن همراه",
  phone_number: "تلفن ثابت",
  email: "ایمیل",
  speciality: "تخصص",
  bio: "بیو",
  avatar: "آواتار",
};

const errorMsg = {
  user_name: " نام کاربری باید ۱۰ کاراکتر و شامل اعداد انگلیسی باشد.",
  birth_date: " تاریخ تولد باید به صورت xxxx-xx-xx باشد.",
  first_name: " نام باید بیشتر از ۳ کاراکتر باشد.",
  last_name: "نام خانوادگی باید بیشتر از ۳ کاراکتر باشد.",
  address: "آدرس باید بیشتر از ۳۰ کاراکتر باشد.",
  mobile_number:
    " تلفن همراه باید به صورت ۰۹xxxxxxxxx و شامل حروف انگلیسی باشد.",
  phone_number:
    "تلفن ثابت باید به صورت xxx-xxxxxxxx  و شامل حروف انگلیسی باشد.",
  "user.email": " ایمیل نا معتبر است.",
  speciality: " تخصص باید بیشتر از ۳کاراکتر باشد.",
  bio: "بیو نامعتبر است.",
};

export class EditProfileDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      errors: null,
      type: "text",
    };
  }
  componentDidUpdate(prev) {
    if (prev.field !== this.props.field) {
      this.setState({ errors: null, value: "" });
      if (this.props.field === "avatar") {
        this.setState({ type: "file" });
      } else {
        this.setState({ type: "text" });
      }
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    var fd = new FormData();
    if (this.props.field === "avatar") {
      fd.append(this.props.field, this.state.value, this.state.value.name);
    } else {
      fd.append(this.props.field, this.state.value);
    }

    axios
      .patch(this.props.api, fd)
      .then((res) => this.props.set(res.data))
      .catch((e) => {
        this.setState({ errors: e.response.data });
      });
  };
  onChange = (e) =>
    this.setState({
      [e.target.name]:
        this.props.field === "avatar" ? e.target.files[0] : e.target.value,
    });
  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="editDialog"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  ویرایش اطلاعات
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
                    <label htmlFor="input" className="col-sm-3 col-form-label">
                      {dict[this.props.field]} جدید:
                    </label>
                    <div className="col-sm-9">
                      <input
                        value={
                          this.props.field === "avatar"
                            ? undefined
                            : this.state.value
                        }
                        type={this.state.type}
                        className={
                          this.state.errors
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="input"
                        required
                        name="value"
                        onChange={this.onChange}
                      />
                      <div className="invalid-feedback">
                        {errorMsg[this.props.field]}
                      </div>
                    </div>
                  </div>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfileDialog;
