import React, { useState } from "react";

const MessageBox = ({ channelName }) => {
    const [messageText, setMessageText] = useState("");

    const handleChange = (e) => {
        setMessageText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: send message to server
        setMessageText("");
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
