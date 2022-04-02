import React, {useState, useEffect, useRef} from "react"; 
import { Routes, Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login/login.component";
import Home from "./components/Home/home.component";
import Profile from "./components/profile.component";
import User from "./components/user.component";
import RegisterForm from "./components/Home/RegisterForm";
import CreateServer from "./components/Server/createserver";
import JoinServer from "./components/Server/joinserver";
import NewChannel from "./components/Channel/createNewChannel";
import ListChannel from "./components/Channel/channelList";
import Server from "./components/Server/Server";
import axios from "axios";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const [currentServer, setCurrentServer] =useState({});
  useEffect(() =>{
    const server = AuthService.getCurrentServer();
    if (server){
      setCurrentServer(server);
    }
  }, []);
const logOut = () => {
  AuthService.logout();
};

  // To prevent major refactoring, ref is needed to check for changes in the DOM
  const isFirstRender = useRef(true);
  const [defaultChannel, setDefaultChannel] = useState("");
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const fetchDefaultChannel = async () => {
          const token = AuthService.getCurrentUser().token;
          const channels = await axios.get(
              `${process.env.REACT_APP_BASE_API_URL}/channels/all/${currentServer.server._id}`,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          const defaultChannel = channels.data[0];
          setDefaultChannel(defaultChannel);
      };
      fetchDefaultChannel();
    }
  }, [currentServer]);

  return (
    <div className="">  
          <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>           
            {currentUser && (
              <li className="nav-item">
                <Link to={"/createserver"} className="nav-link">
                  Create Server
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
              <Link to={"/joinserver"} className="nav-link">
                Join Server
              </Link>
            </li>
            )}
            {currentUser && currentServer && (
                <Link to={`/channel/${defaultChannel._id}`} className="nav-link">
                  Server
                </Link>
              )
            }
            {currentUser && currentServer && (
              <li className="nav-item">
                <Link to={"/createNewChannel"} className="nav-link">
                  Create Channel
                </Link>
              </li>
            )}
             {currentUser && currentServer && (
              <li className="nav-item">
                <Link to={"/channelList"} className="nav-link">
                  Channels
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link"> Login </Link>
              </li>
              <li>
              <Link to={"/newuser"} className="nav-link">New User</Link>
              </li>
            </div>
          )}
        </nav>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/createserver" element={<CreateServer/>}/>
          <Route exact path="/joinserver" element={<JoinServer/>}/>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/user" element={<User/>} />
          <Route exact path="/newuser" element={<RegisterForm/>}/>
          <Route exact path="/createNewChannel" element={<NewChannel/>}/>
          <Route exact path="/channelList" element={<ListChannel/>}/>
          <Route path="/channel/:channelID" element={<Server/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;