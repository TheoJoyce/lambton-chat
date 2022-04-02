import React, { useEffect, useState } from "react";
import axios from "axios";

import AuthService from "../../services/auth.service";

import Message from "../Messages/Message";
import MessageBox from "./MessageBox";

const Channel = ({ channel, serverID, user }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
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
        };
        fetchMessages();
    }, [channel._id, serverID]);

    // TODO: Have channel content start at the bottom of the page
    return (
        <section className="container-sm">
            <h1>{channel.name}</h1>
            <ul className="list-unstyled mt-auto">
                {messages.length > 0 ? (
                    messages.map((message) => {
                        const { _id, text, user: userID, createdAt } = message;
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
                    <h2 className="alert alert-warning text-center">
                        No messages yet
                    </h2>
                )}
            </ul>
            <MessageBox channelName={channel.name} />
        </section>
    );
};

export default Channel;
