import React,{ useState,useEffect, useRef } from "react";
import Client from '../component/Client.js';
import Editor from "../component/Editor.js";
import { initSocket } from "../socket.js";
import ACTIONS from "../Action.js";
import {useLocation} from "react-router-dom";

function EditorPage(){

        const socketRef = useRef(null)
        const location = useLocation()

        const [clients, setClient] = useState([
            {socketId: 1,username: "Deep"},
        ])

        useEffect(()=>{
            const init = async ()=>{
                socketRef.current = await initSocket();
                // socketRef.current.emit(ACTIONS.JOIN, {
                //     roomID,
                //     username : location.state?.username
                // })
            };
            init();
        },[]);

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