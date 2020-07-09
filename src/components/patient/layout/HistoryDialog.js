import React, { Component } from "react";
import axios from "axios";
import Loading from "../../layout/Loading";

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
              <div
                className="modal-header justify-content-center"
                style={{
                  backgroundColor: "rgba(253, 194, 0, 0.6)",
                  borderBottomColor: "#CC9900",
                }}
              >
                <h4 className="modal-title" id="exampleModalLongTitle">
                  جزئیات قرار ملاقات
                </h4>
              </div>
              <div
                className="modal-body"
                style={{
                  backgroundColor: "rgba(253, 194, 0, 0.45)",
                  color: "#28334A",
                  fontSize: "1.2em",
                }}
              >
                <div className="form-row col-md justify-content-center mt-2">
                  <strong style={{ color: "#F65058" }}> نام پزشک: </strong>
                </div>
                <div className="form-row col-md justify-content-center mb-3">
                  {this.props.appointment.calendar.doctor.first_name +
                    " " +
                    this.props.appointment.calendar.doctor.last_name}
                </div>
                <div className="form-row col-md justify-content-center">
                  <strong style={{ color: "#F65058" }}> تخصص پزشک: </strong>
                </div>
                <div className="form-row col-md justify-content-center mb-1">
                  {this.props.appointment.calendar.doctor.speciality}
                </div>
                <div className="yellow-line mt-3 mb-3" />
                <div className="form-row col-md justify-content-center">
                  <strong style={{ color: "#F65058" }}> بیماری: </strong>
                </div>
                <div className="form-row col-md justify-content-center mb-1">
                  <ul style={{ listStyleType: "none", marginRight: "-40px" }}>
                    {this.props.appointment.disease.map((x) => (
                      <li className="text-center">{x.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="form-row col-md justify-content-center">
                  <strong style={{ color: "#F65058" }}> علائم: </strong>
                </div>
                <div className="form-row col-md justify-content-center mb-1">
                  <ul style={{ listStyleType: "none", marginRight: "-40px" }}>
                    {this.props.appointment.symptoms.map((x) => (
                      <li className="text-center">{x.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="yellow-line mb-3 mt-3" />
                <div className="form-row col-md justify-content-center">
                  <strong style={{ color: "#F65058" }}> توصیه ها: </strong>
                </div>
                <div className="form-row col-md justify-content-center mb-1">
                  <ul style={{ listStyleType: "none", marginRight: "-40px" }}>
                    {this.props.appointment.advices.map((x) => (
                      <li className="text-center">{x.name}</li>
                    ))}
                  </ul>
                </div>

                <div className="form-row col-md justify-content-center">
                  <strong style={{ color: "#F65058" }}> داروها: </strong>
                </div>
                <div className="form-row col-md justify-content-center mb-1">
                  <ul style={{ listStyleType: "none", marginRight: "-40px" }}>
                    {this.props.appointment.medicines.map((x) => (
                      <li className="text-center">{x.name}</li>
                    ))}
                  </ul>
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
