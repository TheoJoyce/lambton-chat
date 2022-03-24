import React, {useState, useEffect} from "react";
import { Routes, Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login/login.component";
import Home from "./components/Home/home.component";
import Profile from "./components/profile.component";
import User from "./components/user.component";
import RegisterForm from "./components/Home/RegisterForm";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
const logOut = () => {
  AuthService.logout();
};
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
                <Link to={"/user"} className="nav-link">
                  User
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
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/user" element={<User/>} />
          <Route exact path="/newuser" element={<RegisterForm/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;