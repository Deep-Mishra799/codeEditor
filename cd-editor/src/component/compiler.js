import React from "react";
import {FaPlayCircle} from 'react-icons/fa'

function Compiler(){
    const getValue = () =>{
    }
    return(
        <>
        <nav className="compiler">
            <select id="langSelector" className="lang">
                <option>Java</option>
                <option>C++</option>
                <option>Python</option>
            </select>
            <button className="compilerCode" onClick={()=>getValue()}><FaPlayCircle style={{ fontSize: 35}}/></button>
        </nav>
        </>
    )
}

export default Compiler;