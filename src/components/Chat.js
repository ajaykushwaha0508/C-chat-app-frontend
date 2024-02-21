import React, { useEffect, useState } from 'react';
import {user} from './join.js';

import soketIo from "socket.io-client";
import sendicon from "../Img/send.png";
import Message from './message/Message.js';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from '../Img/closeIcon.png';
import "./chat.css";

const Endpoint = "http://localhost:4000/";
let soket;

const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);
    
    const Send = ()=>{
      const message = document.getElementById("chatInput").value;
        soket.emit('message' , {message , id});
        document.getElementById("chatInput").value = "";
    }
  
    useEffect(()=>{ // if useeffect is run two times then remove strict mode 

             soket = soketIo(Endpoint , {transports : ['websocket']});
            
            soket.on("connect" , ()=>{
                setid(soket.id);
            })
            
            soket.emit("joined" , {user : user}); // this is use to send data to the server 

            soket.on("welcome" , (data)=>{
              setMessages([...messages , data]);  
            })

            return ()=>{
                  soket.emit('disconnect');
                  soket.off();
                }
    } ,[]);

    useEffect(()=>{   
      soket.on("userJoined" ,(data)=>{
        setMessages([...messages , data]);
      });
    } , [messages]);

    useEffect(()=>{
      soket.on('leave' , (data)=>{
        setMessages([...messages , data]);
      })
    } , [messages]);
   
    
    useEffect(()=>{

          soket.on('sendMessage' , (data)=>{
            setMessages([...messages , data]);
            
          })
          return ()=>{
            soket.off();

          }
    } , [messages])

  return (
    <div className='chatpage'>
        <div className='chatContainer'>
        <div className='header'>
          <h2>C CHAT</h2>
         <a href='/'> <img src={closeIcon} alt="close"/> </a>
        </div>
        <ReactScrollToBottom className='chatBox'>
          {
            messages.map((item , i)=>{
              return(

                <Message user={item.id===id?'':item.user} message={item.message} classs={`${item.id===id?'right' : 'left'}`}  key={i}/>
              );
            })
          }
          
        </ReactScrollToBottom>
        <div className='inputBox'>
            <input onKeyDown={(e)=> e.key === 'Enter' ? Send() : null}  id="chatInput" placeholder='Type message...'/>
            <button onClick={Send} id="sendbtn"><img src={sendicon}/></button>
        </div>         
        </div>
    </div>
  )
}

export default Chat