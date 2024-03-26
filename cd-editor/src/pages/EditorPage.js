import React,{ useState,useEffect, useRef } from "react";
import Client from '../component/Client.js';
import Editor from "../component/Editor.js";
import { initSocket } from "../socket.js";
import ACTIONS from "../Action.js";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";
import Compiler from "../component/compiler.js";

function EditorPage(){

        const socketRef = useRef(null);
        const location = useLocation();
        const codeRef = useRef(null)
        const reactNavigator = useNavigate();
        const {roomId} = useParams();

        const [clients, setClient] = useState([])

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
                    roomId,
                    username : location.state?.username
                })

                //listning for joined event

                socketRef.current.on(
                    ACTIONS.JOINED,
                    ({clients,username,socketId})=>{

                        if(username !== location.state?.username){
                            toast.success(`${username} Joined the room`);
                            console.log(`${username}`);
                        }
                        setClient(clients)
                        socketRef.current.emit(ACTIONS.SYNC_CODE,{
                            code : codeRef.current,
                            socketId
                        })
                })

                //listning for disconnected
                socketRef.current.on(
                    ACTIONS.DISCONNECTED,({socketId, username})=>{

                        toast.success(`${username} Left the room.`);
                        setClient((prev)=>{
                            return prev.filter((client)=>client.socketId !== socketId)
                        })

                    })
            };
            init();
            return ()=>{
                socketRef.current.disconnect();
                socketRef.current.off(ACTIONS.JOINED);
                socketRef.current.off(ACTIONS.DISCONNECTED);
            }
        },[]);

        const copyRoomId = async ()=>{
            try {
                await navigator.clipboard.writeText(roomId);
                toast.success("Room ID has been copied");                
            } catch (err) {
                toast.error("Room ID copy failed")
                console.log(err)
            }
        }

        const leaveRoom = ()=>{
            reactNavigator('/')
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.DISCONNECTED);
            socketRef.current.off(ACTIONS.JOINED);
        }
        
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
                <button className="btn copyBtn" onClick={copyRoomId}>Copy Room-ID</button>
                <button  className="btn leaveBtn" onClick={leaveRoom}>Leave</button>
            </div>
            <div className="editorWrap">
                <Editor socketRef={socketRef} roomId={roomId} onCodeChange = {(code)=>{
                    codeRef.current = code
                }}/>
            </div>   
            <div className="compilerWrap">   
            </div>       
        </div>
    )
}

export default EditorPage