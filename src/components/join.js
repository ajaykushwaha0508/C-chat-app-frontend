import React, { useState } from 'react'
import "./join.css";
import logo from "../Img/logo.png";
import { Link } from 'react-router-dom';

let user ; 

const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
}

const Join = () => {

    const [name  ,setName] = useState(null);
    
  return (
   <div className='joinpage'>
    <div className='joincontainer'>
        <img src={logo}/>
        <h1>C CHAT</h1>
        <input onChange={(e)=> setName(e.target.value)}  spellCheck="false" placeholder='Enter your name' type='text' id="joinInput"/>
       <Link to="/chat" onClick={(event)=> !name?event.preventDefault() : null}><button onClick={sendUser}>Login</button></Link> 
    </div>

   </div>
  )
}

export default Join ; 
export {user};
