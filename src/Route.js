import { BrowserRouter,Routes,Route } from "react-router-dom";
import Homepage from "./home/Home";
import Chat from "./chat/Chat";
import {io} from "socket.io-client";


const socket=io.connect("https://srsocketbackend.herokuapp.com/");


function RoutingPage(){
    return(<>
    <BrowserRouter>
        <Routes>
        <Route path="/"  exact element={<Homepage socket={socket}/>} />
        <Route path="/chat/:roomname/:username" element={<Chat socket={socket}/>} />
        </Routes>
    </BrowserRouter>
    </>)
}

export default RoutingPage