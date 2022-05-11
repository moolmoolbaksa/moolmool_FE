import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import styled from 'styled-components';
import RoomList from '../components/chat/RoomList';
import IconTabs from '../components/IconTabs';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { ChatAPI } from '../shared/api';
import LocationBar from '../components/LocationBar';
import ChatRoom from '../components/chat/ChatRoom';
import {setRoomlist} from '../redux/modules/chat';
import { Satellite } from '@mui/icons-material';


// http://13.125.220.67:8080
const Chatroomlist = (props) => {
    const dispatch=useDispatch();
    const Roomlist=useSelector(state=>state.chat.Roomlist);

React.useEffect(()=>{
    ChatAPI.getChatRoom()
    .then((res)=>{
        // console.log(res);
        // console.log(res.data);
        dispatch(setRoomlist(res.data));
        
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
              Roomlist.map((room,idx)=>{
                // console.log(room);
                return <ChatRoom  key={idx} id={room.id} roomId={room.roomId} message={room.message} nickname={room.nickname} profile={room.profile} userId={room.userId}/>;
              })
            }
                {/* <RoomList roomlist={roomlist}></RoomList> */}
            </Container>
            <IconTabs></IconTabs>
        </Base>

    );
        
    
};
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


export default Chatroomlist;