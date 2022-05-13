import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Homepage({socket}){
    const [username, setusername] = useState("");
    const [roomname, setroomname] = useState("");
    const sendData = () => {
        if (username !== "" && roomname !== "") {
          socket.emit("joinRoom", { username, roomname });
        } else {
          alert("username and roomname are must !");
          window.location.reload();
        }
      };
    return(<>
    <div className="outerbox">
      <div className="innerbox-left">
        <div className="title">
          <h1 >Socket.io </h1>
          <h1>Application</h1>
        </div>
      </div>
      <div className="innerbox-right">
        <div className="right-container">
          <p>Welcome to chat</p>
    <div className="details">
    <p>UserName</p>
    <input 
        type="text"
         value={username}
         className="home-editbox"
         onChange={(e) => setusername(e.target.value)}/> 
    <p>Room Name</p>
    <input 
         type="text"  
         value={roomname}
         className="home-editbox"
         onChange={(e) => setroomname(e.target.value)} /><br/>
    <Link to={`/chat/${roomname}/${username}`}>
        <button onClick={sendData} className="home-button">Join</button>
    </Link>
      </div>
        </div>
      
    
    </div>
    </div>
    </>
    )

}

export default Homepage;