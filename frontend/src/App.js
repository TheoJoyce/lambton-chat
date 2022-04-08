import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login/login.component";
import RegisterForm from "./components/Home/RegisterForm";
import CreateServer from "./components/Server/createserver";
import JoinServer from "./components/Server/joinserver";
import NewChannel from "./components/Channel/createNewChannel";
import ListChannel from "./components/Channel/channelList";
import Server from "./components/Server/Server";
import axios from "axios";
import HomeRoute from "./components/Home/HomeRoute";

const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);
    const [currentServer, setCurrentServer] = useState({});
    useEffect(() => {
      const fetchServer = async () => {
        const server = await AuthService.getCurrentServer();
        if (server) {
            setCurrentServer(server);
        }
      }
      if (currentUser) {
        fetchServer();
      }
    }, [currentUser]);
    const logOut = () => {
        AuthService.logout();
    };

    const [defaultChannel, setDefaultChannel] = useState({});
    const [userBody, setUserBody] = useState({});

    useEffect(() => {
        const fetchDefaultChannel = async () => {
            const token = AuthService.getCurrentUser().token;

            const channelsRes = await axios.get(
                `${process.env.REACT_APP_BASE_API_URL}/channels/all/${currentServer._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const channels = channelsRes.data;
            const defaultChannel = channels[0] || {};
            setDefaultChannel(defaultChannel);

            const userBodyRes = await axios.post(
                `${process.env.REACT_APP_BASE_API_URL}/users/auth/verify/`,
                {
                    token,
                }
            );
            setUserBody(userBodyRes.data.user);
        };

        if (currentServer._id) {
            fetchDefaultChannel();
        }
    }, [currentServer]);

    return (
        <div className="">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                    {currentUser && !currentServer && (
                        <li className="nav-item">
                            <Link to={"/createserver"} className="nav-link">
                                Create Server
                            </Link>
                        </li>
                    )}
                    {currentUser && !currentServer._id && (
                        <li className="nav-item">
                            <Link to={"/joinserver"} className="nav-link">
                                Join Server
                            </Link>
                        </li>
                    )}
                    {currentUser && currentServer._id && defaultChannel._id && (
                        <Link
                            to={`/channel/${defaultChannel._id}`}
                            className="nav-link"
                        >
                            Server
                        </Link>
                    )}
                    {currentUser &&
                        currentServer._id &&
                        userBody.id === currentServer.admin && (
                            <li className="nav-item">
                                <Link
                                    to={"/createNewChannel"}
                                    className="nav-link"
                                >
                                    Create Channel
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
                            <a
                                href="/login"
                                className="nav-link"
                                onClick={logOut}
                            >
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                {" "}
                                Login{" "}
                            </Link>
                        </li>
                        <li>
                            <Link to={"/newuser"} className="nav-link">
                                New User
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
            <div>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <HomeRoute defaultChannel={defaultChannel._id} />
                        }
                    />
                    <Route
                        exact
                        path="/createserver"
                        element={<CreateServer updateUserState={setCurrentUser} />}
                    />
                    <Route exact path="/joinserver" element={<JoinServer updateUserState={setCurrentUser} />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/newuser" element={<RegisterForm />} />
                    <Route
                        exact
                        path="/createNewChannel"
                        element={<NewChannel />}
                    />
                    <Route
                        exact
                        path="/channelList"
                        element={<ListChannel />}
                    />
                    <Route path="/channel/:channelID" element={<Server />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
