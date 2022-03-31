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
    token = token.token;
    return axios.get(API_URL + "servers/code/" + joinCode, { headers: {"Authorization": `Bearer ${token}`} })
    .then (res =>{
      const serverId = res.data._id;
      localStorage.removeItem("server");
      localStorage.setItem("server", JSON.stringify(res.data));
      axios.post(API_URL + "users/update", {serverId} ,{ headers: {"Authorization": `Bearer ${token}`} });
    })
  }
  getCurrentServer() {
    return JSON.parse(localStorage.getItem('server'));
  }
  //creating the channel
  createChannel(name, token = JSON.parse(localStorage.getItem('user'))){
    token = token.token;
    const id = JSON.parse(localStorage.getItem("server"));
    const serverID = id.server._id;
    const admin = id.server.admin;
    return axios
      .post(API_URL + "channels/create", {name, serverID, admin}, { headers: {"Authorization": `Bearer ${token}`} })
  }
  //view channels 
  viewChannel(token = JSON.parse(localStorage.getItem('user'))){
    token = token.token;
    const id = JSON.parse(localStorage.getItem("server"));
    const serverID = id.server._id;
    console.log (serverID);
    axios
      .get(API_URL + "channels/all/" + serverID, { headers: {"Authorization": `Bearer ${token}`} })
      .then (res => {
        localStorage.removeItem('channels');
        localStorage.setItem('channels', JSON.stringify(res.data));
      })
      console.log (JSON.parse(localStorage.getItem('channels')));
      return JSON.parse(localStorage.getItem('channels'));
  }
}
export default new AuthService();