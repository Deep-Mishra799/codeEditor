import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import { Socket } from 'socket.io-client';
import {FaPlayCircle} from 'react-icons/fa'
import ACTIONS from '../Action';

const Editor = ({socketRef, roomId, onCodeChange}) =>{

    const editorRef = useRef(null)

    useEffect(()=>{
        async function init(){

            editorRef.current = CodeMirror.fromTextArea(document.getElementById('codeEditor'),{
                mode : {name:'javascript', JSON:true},
                theme : 'dracula',
                autoCloseTags: true,
                autoCloseBrackets:true,
                lineNumbers:true,
            });

            //sending the changes occuring on platform to the server AKA server.js
            editorRef.current.on('change', (instance, changes)=>{
                console.log("changes", changes);
                const {origin} = changes;
                const code = instance.getValue();
                onCodeChange(code)
                if(origin !== 'setValue'){
                    socketRef.current.emit(ACTIONS.CODE_CHANGE,{
                        roomId,
                        code,
                    })
                }
            });
        }
        init()
    },[])

    //receiving/broadcasting the codes
    useEffect(()=>{
        if(socketRef.current){
            socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{
                console.log(code);
                if(code!==null){
                    editorRef.current.setValue(code)
                }
            })
        }

        return ()=>{
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        }
        
    },[socketRef.current]);

    return(
        <div className='CEContainer'>
            <div className='CEMain'>
                <textarea id='codeEditor'></textarea>
            </div>
            <div className='CECompiler'>
                <nav className="compiler">
                    <select id="langSelector" className="lang">
                        <option>Java</option>
                        <option>C++</option>
                        <option>Python</option>
                    </select>
                    <button className="compilerCode" ><FaPlayCircle style={{ fontSize: 35}}/></button>
                </nav>
            </div>
        </div>
    )
}

export default Editor