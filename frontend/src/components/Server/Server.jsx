import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import AuthService from "../../services/auth.service";

import Channel from "../Channel/Channel";
import ChannelList from "../Channel/channelList";

import { unescapeHtml } from "../../helpers/unescapeHtml";

const Server = () => {
    const [user, setUser] = useState(null);
    const [server, setServer] = useState(null);
    const [channel, setChannel] = useState(null);

    const { channelID } = useParams();

    useEffect(() => {
        const token = AuthService.getCurrentUser().token;
        const fetchUser = async () => {
            // Ideally would use redux to store user
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_API_URL}/users/auth/verify/`,
                { token }
            );
            const { user } = response.data;
            setUser(user);
        };
        fetchUser();

        const fetchServer = async () => {
            const server = await AuthService.getCurrentServer();
            setServer(server);
        }
        fetchServer();

        const fetchChannel = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_API_URL}/channels/${channelID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const channel = response.data;
            setChannel(channel);
        };
        fetchChannel();
    }, [channelID]);

    return (
        <section className="container d-flex mt-2" style={{ height: "900px" }}>
            <section>
                {server && (
                    <>
                        <div>
                            <h1 className="text-center">{unescapeHtml(server.name)}</h1>
                        </div>

                        <div className="shadow rounded p-2 my-2">
                            <h5 className="text-center fs-6">Join Code</h5>
                            <p className="my-0 text-center fw-bolder">{server.code}</p>
                        </div>
                    </>
                )}
                <div className="shadow" style={{ height: "770px" }}>
                    <ChannelList />
                </div>
            </section>
            <section className="container-sm">
                {channel && server && user && (
                    <Channel
                        channel={channel}
                        serverID={server._id}
                        user={user}
                    />
                )}
            </section>
        </section>
    );
};

export default Server;
