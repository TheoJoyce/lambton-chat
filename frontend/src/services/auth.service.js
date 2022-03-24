import axios from "axios";
const API_URL = `${process.env.REACT_APP_BASE_API_URL}/`

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "auth/login", {
        email,
        password
      })
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data));
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(firstName,lastName,title, email, password) {
    return axios.post(API_URL + "auth/register", {
      firstName,
      lastName,
      title,
      email,
      password
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  createServer(name, user=localStorage.getItem('user')){
    return axios.post(API_URL + "servers/create", {
      name,
      user
    });
  }
}
export default new AuthService();