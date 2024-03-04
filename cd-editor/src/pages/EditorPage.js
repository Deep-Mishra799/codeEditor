import React,{ useState } from "react";
import Client from "../component/Client.js";

function Editor(){

        const [clients, setClient] = useState([
            {socketId: 1,username: "guest"},
            {socketId: 2,username: "guest2"},
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
                            clients.map((client)=>(
                                <Client />
                            ))
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