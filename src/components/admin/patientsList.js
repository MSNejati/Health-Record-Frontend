import React, { Component } from "react";
import "../../css/listOfUsers.css";
import axios from "axios";
import { userAPI } from "../../apis/requests";
import { positions } from "react-alert";
import "../../css/register.css";
import "../../css/sidebar.css";
import SideBar from "./sideBar";
import Loading from "../layout/Loading";
import { Link } from "react-router-dom";

class listOfPatients extends Component {
  state = {
    patients: null,
  };

  async componentDidMount() {
    await axios.get(userAPI("PATIENTS")).then((res) => {
      this.setState({ patients: res.data.results });
    });
  }
  render() {
    const { patients } = this.state;
    const patientsList = patients ? (
      patients.map((patient) => {
        return (
          <div className="card mr-10" key={patient.id}>
            <div className="card-body">
              <span className="card-title">
                {patient.first_name} {patient.last_name}
              </span>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis accusantium neque reiciendis aperiam exercitationem
                ut adipisci saepe vel eaque quidem? Modi cupiditate eum in.
                Blanditiis iusto dolorem explicabo necessitatibus doloremque?
              </p>
              <Link to="#" class="btn btn-primary">
                Profile
              </Link>
            </div>
          </div>
        );
      })
    ) : (
      <Loading />
    );
    return (
      <div className="wrapper">
        <SideBar
          isActive={this.state.isActive}
          isAddPatient={this.state.isAddPatient}
        />
        <div id="content">
          <div className="my-Register-page">{patientsList}</div>
        </div>
      </div>
      //   <div class="card-columns">
      //     <div className="card testimonial-card mt-2 mb-3">
      //       {/* <!-- Background color --> */}
      //       <div className="card-up aqua-gradient"></div>

      //       {/* <!-- Avatar --> */}
      //       <div className="avatar mx-auto white">
      //         <img
      //           src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2831%29.jpg"
      //           className="rounded-circle img-responsive"
      //           alt="woman avatar"
      //         />
      //       </div>

      //       {/* <!-- Content --> */}
      //       <div className="card-body">
      //         {/* <!-- Name --> */}
      //         <h4 className="card-title font-weight-bold">Martha Smith</h4>
      //         <hr />
      //         {/* <!-- Quotation --> */}
      //         <p>
      //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
      //           aperiam neque similique non porro blanditiis minus nostrum soluta,
      //           aliquam culpa ut dicta deleniti voluptate, explicabo repellat iste
      //           sit voluptatum fugit?
      //         </p>
      //       </div>
      //     </div>
      //   </div>
    );
  }
}

export default listOfPatients;
