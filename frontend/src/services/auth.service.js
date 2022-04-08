import axios from "axios";
import { createRoutesFromChildren } from "react-router-dom";
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
    localStorage.removeItem("server");
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

  async createServer(name, token = JSON.parse(localStorage.getItem('user'))){
    token = token.token;
    const res = await axios
      .post(API_URL + "servers/create", { name }, { headers: { "Authorization": `Bearer ${token}` } });
    const serverID = res.data.server._id;
    const userRes = await axios.post(API_URL + "users/update", { serverID }, { headers: { "Authorization": `Bearer ${token}` } });
    localStorage.setItem("user", JSON.stringify({msg: "Logged in!", token: userRes.data.token}));
  }
  async joinServer(joinCode, token = JSON.parse(localStorage.getItem('user'))){
    token = token.token;
    const res = await axios.get(API_URL + "servers/code/" + joinCode, { headers: { "Authorization": `Bearer ${token}` } });
    const serverID = res.data._id;
    const userRes = await axios.post(API_URL + "users/update", { serverID }, { headers: { "Authorization": `Bearer ${token}` } });
    localStorage.setItem("user", JSON.stringify({msg: "Logged in!", token: userRes.data.token}));
  }
  async getCurrentServer() {
    const { token } = JSON.parse(localStorage.getItem("user"));
    const userRes = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/users/auth/verify`, {token});
    const { user } = userRes.data;

    // Return null if there is no server assigned to the user
    if (!user.server) return null;
    
    const serverRes = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/servers/${user.server}`, {headers: {"Authorization": `Bearer ${token}`}});
    const server = serverRes.data;

    return server;
  }
  //creating the channel
  async createChannel(name, token = JSON.parse(localStorage.getItem('user'))){
    token = token.token;
    const server = await this.getCurrentServer();
    const {admin, _id: serverID} = server;
    return axios
      .post(API_URL + "channels/create", {name, serverID, admin}, { headers: {"Authorization": `Bearer ${token}`} })
      .then(res =>{
        console.log(res.data.channel._id);
        const x = res.data.channel._id;
        return x;
      })
  }
  //view channels 
  async viewChannel(token = JSON.parse(localStorage.getItem('user'))){
    token = token.token;
    const server = await this.getCurrentServer();
    const serverID = server._id;
    
    const channelsRes = await axios.get(API_URL + "channels/all/" + serverID, { headers: {"Authorization": `Bearer ${token}`} });
    const channels = channelsRes.data || [];
    
    return channels;
  }
}
export default new AuthService();