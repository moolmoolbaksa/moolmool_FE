import React, { useState } from 'react';
import styled from 'styled-components';
import { Image } from '../../elements';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useParams } from 'react-router-dom';
import ReceviedMessage from './ReceviedMessage';
import Sentmessage from './Sentmessage';
import NotiMessage from'./NotiMessage'
import { ChatAPI } from '../../shared/api';

import {useDispatch,useSelector} from 'react-redux';
import {getPreviousMessages,addMessage,changeRoomtype} from '../../redux/modules/chat'
import Devide from './Devide';

const MessageList = (props) => {
        
    const dispatch=useDispatch();
    

    const roomid=useParams();
    const Opponent=useSelector(state=>state.chat.Opponent);
    const messages=useSelector(state=>state.chat.messages);
    const ScrollState=useSelector(state=>state.chat.moveScroll);
  // console.log(ScrollState);
    const messageref=React.useRef(null);

    const apiroomid=parseInt(roomid.roomid);
 
    React.useEffect(()=>{
        ChatAPI.getMessage(apiroomid)
        .then((res)=>{
        dispatch(getPreviousMessages(res.data));
        })
        .catch((error)=>{
        console.log(error);
    })

    return()=>{
       
    
}
    },[dispatch])
    
    React.useEffect(()=>{

        console.log(`/sub/chat/room/${apiroomid}`)
          
        
        return()=>{
       
            // {messageId: 19, senderId: 2, message: 'asd', date: '2022-05-09T21:58:30.252', isRead: true, …}
    }
    },[])
    React.useEffect(()=>{
      setTimeout(function() { messageref.current.scrollTop=messageref.current.scrollHeight; }, 100);  
      
        return()=>{
    }
    },[messages,ScrollState])
    // console.log(message_temp);
    
    return(
        <Base ref={messageref}>
        {/* {   listmessage.sort((a,b)=>a.messageId-b.messageId) */}
        {    messages.slice().sort((a,b)=>a.messageId-b.messageId)?.map((message,idx)=>
            message.type==="STATUS"?<NotiMessage key={'keyid'+message.messageId} date={message.date} message={message.message}></NotiMessage>
            :message.type==="DEVIDE"?<Devide key={'keyid'+message.messageId} date={message.date}/>:
            message.senderId===Opponent.userId?(<ReceviedMessage key={'keyid'+message.messageId} date={message.date} profile={Opponent.profile} message={message.message}/>):(<Sentmessage key={'keyid'+message.messageId} date={message.date}
             message={message.message}/>))
            

        }
        </Base>
    );
        
    
};
const Base = styled.div`
    height: calc(100% - 130px);
    padding: 0 0 10px 0;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    background:#F4F2EF;
`;


        


export default MessageList;