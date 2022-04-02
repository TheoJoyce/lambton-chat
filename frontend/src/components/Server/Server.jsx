import React from "react";
import Message from "../Messages/Message";

const Server = () => {
    return (
        <container class="container">
            <ul className="list-unstyled container-sm">
                <Message
                    text={"Hello world!"}
                    user={{ firstName: "Theo", lastName: "Joyce", title: "Junior Software Engineer" }}
                    timestamp={new Date().toLocaleString()}
                />
            </ul>
        </container>
    );
};

export default Server;
