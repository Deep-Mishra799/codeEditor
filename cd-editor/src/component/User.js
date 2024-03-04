import React from "react";
import Avatar from "./Avatar.js";

const Client = (username) =>{

    return(<div className="user">
        <Avatar />
        <span className="userName">{username}</span>
    </div>);

}

export default Client