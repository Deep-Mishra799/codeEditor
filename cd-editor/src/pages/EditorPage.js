import React,{ useState } from "react";
import User from "../component/User";

function Editor(){

        const [users, setUser] = useState([
            {socketId: 1,username: "guest"},
            {socketId: 2,username: "guest2"}
        ])
    return(
        <>
        <div className="mainWrap">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img src="/logo3.jpg" alt="logo" className="editorLogo" />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientList">
                        {
                            users.map((user)=>{
                                <User key={user.socketId} 
                                        username = {user.username}/>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="editorWrap">main editor goes here</div>
        </div>
        </>
    )
}

export default Editor