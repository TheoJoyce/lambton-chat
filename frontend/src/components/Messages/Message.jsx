import React from "react";

const Message = ({ text, user, timestamp }) => {
    return (
        <li className="shadow-sm m-2 px-3 py-2 rounded-2">
            <h5 className="card-title">
                {user.firstName} {user.lastName}{" "}
                <span className="fs-6 text-muted">{timestamp}</span>
            </h5>
            {user.title ? (
                <h5 className="card-subtitle fs-6 text-black-50">
                    {user.title}
                </h5>
            ) : null}
            <p>{text}</p>
        </li>
    );
};

export default Message;
