import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";

const dict = {
  first_name: "نام",
  last_name: "نام خانوادگی",
  speciality: "تخصص",
};

export class EditProfileDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.appointment ? (
      <div>
        <div
          className="modal fade"
          id="historyDialog"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  جزئیات قرار ملاقات
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
              <div className="modal-body">
                <div className="form-row col-md">
                  <strong> نام پزشک: </strong>
                  {this.props.appointment.calendar.doctor.first_name +
                    " " +
                    this.props.appointment.calendar.doctor.last_name}
                </div>
                <div className="form-row col-md">
                  <strong> تخصص پزشک: </strong>
                  {this.props.appointment.calendar.doctor.speciality}
                </div>
                <div className="form-row col-md">
                  <strong> بیماری: </strong>
                  {this.props.appointment.disease.map((x) => (
                    <p>{x.name + "  "}</p>
                  ))}
                </div>
                <div className="form-row col-md">
                  <strong> توصیه ها: </strong>
                  {this.props.appointment.advices.map((x) => (
                    <p>{x.name + "  "}</p>
                  ))}
                </div>
                <div className="form-row col-md">
                  <strong> علائم: </strong>
                  {this.props.appointment.symptoms.map((x) => (
                    <p>{x.name + "  "}</p>
                  ))}
                </div>
                <div className="form-row col-md">
                  <strong> داروها: </strong>
                  {this.props.appointment.medicines.map((x) => (
                    <p>{x.name + "  "}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default EditProfileDialog;
