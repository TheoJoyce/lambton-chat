import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import AuthService from "../../services/auth.service";

import Message from "../Messages/Message";
import MessageBox from "./MessageBox";

const Channel = ({ channel, serverID, user }) => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = useCallback(async () => {
        const token = AuthService.getCurrentUser().token;
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/messages/${serverID}/${channel._id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const messages = response.data;
        setMessages(messages);
    }, [serverID, channel._id]);

    const FIFTEEN_SECONDS_MS = 15000;
    useEffect(() => {
        // Update messages on load and then every 30 seconds
        // Socket.io would be a better implementation, given time
        fetchMessages();
        const messageUpdate = setInterval(fetchMessages, FIFTEEN_SECONDS_MS);

        return () => clearInterval(messageUpdate);
    }, [fetchMessages]);

    return (
        <section
            className="container-sm shadow rounded-3 p-2 d-flex flex-column"
            style={{ height: "900px" }}
        >
            <h2>{channel.name}</h2>
            <div className="d-flex flex-column-reverse overflow-auto mt-auto">
                <ul className="list-unstyled">
                    {messages.length > 0 ? (
                        messages.map((message) => {
                            const {
                                _id,
                                text,
                                user: userID,
                                createdAt,
                            } = message;
                            return (
                                <Message
                                    key={_id}
                                    text={text}
                                    userID={userID}
                                    timestamp={createdAt}
                                />
                            );
                        })
                    ) : (
                        <h3 className="alert alert-warning text-center">
                            No messages yet
                        </h3>
                    )}
                </ul>
            </div>
            <MessageBox
                channelID={channel._id}
                channelName={channel.name}
                messageCallback={fetchMessages}
            />
        </section>
    );
};

export default Channel;
