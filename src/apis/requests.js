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
  }
};

export const doctorAPI = (type, id = "") => {
  id = id === "" ? id : id + "/";
  switch (type) {
    case "TURNS":
      return `${HOSTNAME}appointment/doctor/turns/${id}`;
  }
};
