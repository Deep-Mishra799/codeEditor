import React,{ useState,useEffect, useRef } from "react";
import Client from '../component/Client.js';
import Editor from "../component/Editor.js";
import { initSocket } from "../socket.js";
import ACTIONS from "../Action.js";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";

function EditorPage(){

        const socketRef = useRef(null);
        const location = useLocation();
        const reactNavigator = useNavigate();
        const params = useParams();
        console.log(params);

        const [clients, setClient] = useState([
            {socketId: 1,username: "Deep"},
        ])

        useEffect(()=>{
            const init = async ()=>{
                socketRef.current = await initSocket();
                socketRef.current.on('connect_error', (err)=>handleErrors(err))
                socketRef.current.on('connect_failed', (err)=>handleErrors(err))

                function handleErrors(e){
                    console.log('Socket error' (e))
                    toast.error('Socket connection failed!, Try again later.')
                    reactNavigator('/')
                }

                socketRef.current.emit(ACTIONS.JOIN, {
                    // roomId,
                    username : location.state?.username
                })
            };
            init();
        },[]);
        
        if(!location.state){
            return <Navigate to="/" />
        }

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