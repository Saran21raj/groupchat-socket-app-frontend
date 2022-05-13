import React,{ useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "./Chat.css";

function Chat({socket}){
    console.log(socket);
    const params=useParams();
    const username=params.username;
    const roomname=params.roomname;
    const navigate=useNavigate();


    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", (data) => {
          let temp = messages;
          temp.push({
            userId: data.userId,
            username: data.username,
            text: data.text,
          });
          setMessages([...temp]);
        });
      }, [socket]);
      const sendData = () => {
        if (text !== "") {
          //encrypt here
          socket.emit("chat", text);
          setText("");
        }
      };
      const userdisconnect=()=>{
        socket.disconnect("disconnect");
        navigate('/');
        
      }
    const messagesEndRef = useRef(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    
    useEffect(scrollToBottom, [messages]);
    
    console.log(messages, "mess");
    return(
    <>
    <div className="chat-outerbox">
      <div className="chat-left">
        <div className="chatbox">
          <div className="chatbox-user-name">
            <div className="username">
              <h2 style={{color:"#06113C", paddingLeft:"10px"}}>
                {username} <span style={{ fontSize: "12px" }}>in {roomname}</span>
              </h2>
            </div>
            <div className="disconnect">
            <button className="chat-disconnect" onClick={userdisconnect}>Disconnect</button>
          </div>
          </div>
          <div className="chatbox-message-container">
              {messages.map((i) => {
                if (i.username === username) {
                  return (
                    <div className="chatbox-sender-message">
                      <p>{i.text}</p>
                      <span>{i.username}</span>
                    </div>
                  );
                } else {
                  return (
                    <div className="chatbox-receiver-message">
                      <p>{i.text} </p>
                      <span>{i.username}</span>
                    </div>
                  );
                }
              })}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbox-message-send">
            <input
              className="chat-editbox"
              placeholder="enter your message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendData();
              }
              }}
            ></input>
            <button className="chat-sendbutton" onClick={sendData}>Send</button>
          </div>
          
        </div>
      </div>
      <div className="chat-right">
        <div className="chat-right-title">
          <h1 >Socket.io </h1>
          <h1>Application</h1>
        </div>
      </div>
    </div>


   
    </>)
}

export default Chat;