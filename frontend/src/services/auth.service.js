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
    return axios.post(API_URL + "users/auth/register", {
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
    return axios
      .post(API_URL + "servers/create", {name}, { headers: {"Authorization": `Bearer ${token}`} })
      .then(res => {
        localStorage.setItem("server", JSON.stringify(res.data));
        const serverId = JSON.parse(localStorage.getItem('server'));
        const id = serverId.server._id;
        axios.post(API_URL + "users/update", {id} ,{ headers: {"Authorization": `Bearer ${token}`} });
      })
  }
  joinServer(joinCode, token = JSON.parse(localStorage.getItem('user'))){
    token= token.token;  
    //good code↑ working on ↓
    axios.get(API_URL + "servers/code/:code" ,{joinCode}, { headers: {"Authorization": `Bearer ${token}`}})
    .then (res =>{
    console.log("test");
    })




    //getting the server id ↑
    //woring join code ↓
    /*
    const serverId = JSON.parse(localStorage.getItem('server'));
    const id = serverId.server._id;
    axios.post(API_URL + "users/update", {id} ,{ headers: {"Authorization": `Bearer ${token}`} });
    */
  }
}
export default new AuthService();