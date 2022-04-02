import React, { useState, useEffect } from "react";
import axios from "axios";

import AuthService from "../../services/auth.service";

const Message = ({ text, userID, timestamp }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = AuthService.getCurrentUser().token;
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_API_URL}/users/${userID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const user = response.data;
            setUser(user);
        };
        fetchUser();
    }, [userID]);

    // Ensure message only loads when its user is loaded
    return (
        <>
            {user && (
                <li className="shadow-sm m-2 px-3 py-2 rounded-2">
                    <h5 className="card-title">
                        {user.firstName} {user.lastName}{" "}
                        <span className="fs-6 text-muted">
                            {new Date(timestamp).toLocaleDateString()}
                        </span>
                    </h5>
                    {user.title ? (
                        <h5 className="card-subtitle fs-6 text-black-50">
                            {user.title}
                        </h5>
                    ) : null}
                    <p>{text}</p>
                </li>
            )}
        </>
    );
};

export default Message;
