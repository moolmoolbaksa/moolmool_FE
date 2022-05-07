import React, { useState } from 'react';
import styled from 'styled-components';
import RoomList from '../components/chat/RoomList';
import IconTabs from '../components/IconTabs';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { ChatAPI } from '../shared/api';
import LocationBar from '../components/LocationBar';
import ChatRoom from '../components/chat/ChatRoom';
const Base = styled.div`
width: 100%;
height: 100vh;
padding: 0 12px;
box-sizing: border-box;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
`;
// http://13.125.220.67:8080
const Chatroomlist = (props) => {
    // let sock = new SockJS('http://13.124.0.71/ws-stomp');
    // let ws = Stomp.over(sock);

    // const stompConnect=()=>{
    //     try{

    //     }
    //     catch (err) {

    //     };
    // }
    const [roomlist,setRoomlist]=useState([]);

React.useEffect(()=>{
    ChatAPI.getChatRoom()
    .then((res)=>{
        console.log(res);
        console.log(res.data);
        setRoomlist(res.data);
    })
    .catch((error)=>{
        console.log(error);
    })
    
},[])
    
    return(
        <Base>
            <LocationBar></LocationBar>
            <Container>
            {
              roomlist.map((room,idx)=>{
                console.log(room);
                return <ChatRoom  key={idx} roomId={room.roomId} message={room.message} nickname={room.nickname} profile={room.profile}/>;
              })
            }
                {/* <RoomList roomlist={roomlist}></RoomList> */}
            </Container>
            <IconTabs></IconTabs>
        </Base>

    );
        
    
};



export default Chatroomlist;