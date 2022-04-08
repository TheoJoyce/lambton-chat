import React, { useEffect, useState } from "react";
import axios from "axios";

import AuthService from "../../services/auth.service";

const MessageBox = ({ channelID, channelName, messageCallback }) => {
    const [messageText, setMessageText] = useState("");
    const [server, setServer] = useState(null);

    useEffect(() => {
        const fetchServer = async () => {
            const server = await AuthService.getCurrentServer();
            setServer(server);
        };
        fetchServer();
    }, [])

    const handleChange = (e) => {
        setMessageText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                `${process.env.REACT_APP_BASE_API_URL}/messages/create`,
                {
                    text: messageText,
                    serverID: server._id,
                    channelID,
                },
                {
                    headers: {
                        Authorization: `Bearer ${
                            AuthService.getCurrentUser().token
                        }`,
                    },
                }
            )
            .then((res) => {
                setMessageText("");
                messageCallback();
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="shadow-lg rounded-3 px-3 py-2 border-0 w-100"
                style={{ resize: "none" }}
                placeholder={`Send a message to ${channelName}`}
                value={messageText}
                onChange={handleChange}
            />
        </form>
    );
};

export default MessageBox;
