import React, { useState } from 'react';

import {v4 as uuidV4} from 'uuid';
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    const [roomID, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    
    const createNewRoom = (e) =>{
        
        e.preventDefault();
        
        const id = uuidV4();
        setRoomId(id);

        toast.success('Room Created')
    };

    const joinRoom = () =>{
        if(!roomID || !userName){
            toast.error('Room ID and Username is required');
            return;
        }

        //redirect
        navigate(`/editor/${roomID}`,{
            state:{
                //This will help us to get the username to the editors page.
                userName,
            },
        });
    };

    const handleInputEnter = (e) =>{
        //Enter to click join button
        if(e.code === "Enter"){
            joinRoom();
        }
    }
    
    return(
        <div className="homePageWrapper">

            <div className="formWrapper">

                <img className="homePageLogo" src="/logo3.jpg" alt="CD-logo" />

                <h4 className="mainLabel">Place Invitation Room ID</h4>

                <div className="inputGroup">

                    <input type="text" onKeyUp={handleInputEnter} className="inputBox" value={roomID} onChange={(e)=>setRoomId(e.target.value)} placeholder="ROOM ID" />

                    <input type="text" onKeyUp={handleInputEnter} className="inputBox" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="USER NAME" />

                    <button onClick={joinRoom} className="btn joinBtn">Join</button>

                    <span className="createInfo">

                        If you don't have invite then &nbsp;

                        <a href="" onClick={createNewRoom}className="createNewBtn">Create Room</a>

                    </span>

                </div>

            </div>

            <footer>

                <h4>Built by <a href="https://github.com/Deep-Mishra799">Prabhat santosh Mishra</a></h4>

            </footer>

        </div>
    )
}

export default Home