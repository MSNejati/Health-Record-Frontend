const HOSTNAME = "http://localhost:8000/";

export const userAPI = (type, id = "") => {
  id = id === "" ? id : id + "/";
  switch (type) {
    case "LOGIN":
      return `${HOSTNAME}auth/login/`;
    case "LOGOUT":
      return `${HOSTNAME}auth/logout/`;
    case "RETRIEVE":
      return `${HOSTNAME}auth/retrieve/`;
    case "REFRESH":
      return `${HOSTNAME}auth/refresh/`;
    case "MANAGE_PATIENTS":
      return `${HOSTNAME}auth/manager/patients/${id}`;
    case "MANAGE_DOCTORS":
      return `${HOSTNAME}auth/manager/doctors/${id}`;
    case "PROFILE":
      return `${HOSTNAME}auth/profile/`;
    case "CHANGE_PASSWORD":
      return `${HOSTNAME}auth/change-password/`;
    default:
      return;
  }
};

export const doctorAPI = (type, id = "") => {
  id = id === "" ? id : id + "/";
  switch (type) {
    case "CALENDARS":
      return `${HOSTNAME}appointment/doctor/calendar/${id}?limit=6&ordering=day,start_time`;
    case "APPOINTMENTS":
      return `${HOSTNAME}appointment/doctor/${id}?limit=6&ordering=calendar__day,calendar__start_time`;
    case "ADVICES":
      return `${HOSTNAME}appointment/doctor/advices/${id}?limit=4&ordering=name`;
    case "DISEASES":
      return `${HOSTNAME}appointment/doctor/diseases/${id}?limit=4&ordering=name`;
    case "SYMPTOMS":
      return `${HOSTNAME}appointment/doctor/symptoms/${id}?limit=4&ordering=name`;
    case "MEDICINES":
      return `${HOSTNAME}appointment/doctor/medicines/${id}?limit=4&ordering=name`;
    default:
      return;
  }
};

export const patientAPI = (type, id = "") => {
  id = id === "" ? id : id + "/";
  switch (type) {
    case "TURNS":
      return `${HOSTNAME}appointment/patient/turns/${id}?limit=6&ordering=day,start_time`;
    default:
      return;
  }
};
