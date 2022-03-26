import axios from "axios";
const API_URL = `${process.env.REACT_APP_BASE_API_URL}/`

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "users/auth/login", {
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
    return axios.post(API_URL + "user/auth/register", {
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
  createServer(name, token = JSON.parse(localStorage.getItem('user'))){
    token = token.token;
    return axios.post(API_URL + "servers/create", {name}, { headers: {"Authorization": `Bearer ${token}`} });
  }
}
export default new AuthService();