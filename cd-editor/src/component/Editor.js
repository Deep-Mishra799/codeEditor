import React, { useEffect } from 'react';
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'

const Editor = () =>{

    useEffect(()=>{
        async function init(){

            CodeMirror.fromTextArea(document.getElementById('codeEditor'),{
                mode : {name:'javascript', JSON:true},
                theme : 'dracula',
                autoCloseTags: true,
                autoCloseBrackets:true,
                lineNumbers:true,
            });

        }
        init()
    },[])

    return(
        <textarea id='codeEditor'></textarea>
    )

}

export default Editor