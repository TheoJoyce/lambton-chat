import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";

const HomeRoute = ({ defaultChannel }) => {
    const navigate = useNavigate();

    // Navigate to the correct page
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            // User is logged in
            AuthService.getCurrentServer().then((server) => {
                // If there is a server, navigate to the server page
                if (server) {
                    if (defaultChannel) {
                        navigate(`/channel/${defaultChannel}`);
                    }
                } else {
                    // If there is no server, navigate to the server creation page
                    navigate("/createserver");
                }
            });
        } else {
            // User is not logged in
            navigate("/login");
        }
    }, [defaultChannel, navigate]);
    return <></>;
};

export default HomeRoute;
