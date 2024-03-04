import React,{ useState } from "react";
import Client from '../component/Client.js';
import Editor from "../component/Editor.js";

function EditorPage(){

        const [clients, setClient] = useState([
            {socketId: 1,username: "Deep"},
    
        ])

    return(
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
                                <Client key={client.socketId} username = {client.username}/>
                            ))
                        }
                    </div>
                </div>
                <button className="btn copyBtn">Copy Room-ID</button>
                <button className="btn leaveBtn">Leave</button>
            </div>
            <div className="editorWrap">
                <Editor />
            </div>
                        
        </div>
    )
}

export default EditorPage