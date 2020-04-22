const HOSTNAME = "https://localhost:8000/";

const apiRequest = (type, id = false) => {
  switch (type) {
    case "LOGIN":
      return `${HOSTNAME}auth/login/`;
    case "LOGOUT":
      return `${HOSTNAME}auth/logout/`;
    case "LOAD":
      return `${HOSTNAME}auth/retrieve/`;
    case "REFRESH":
      return `${HOSTNAME}auth/refresh/`;
  }
};
