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

const MessageList = (props) => {
        
    const dispatch=useDispatch();
    

    const roomid=useParams();
    const Opponent=useSelector(state=>state.chat.Opponent);
    const messages=useSelector(state=>state.chat.messages);
    

    const messageref=React.useRef(null);

    const apiroomid=parseInt(roomid.roomid);

    console.log()
    console.log(typeof(apiroomid));    
    React.useEffect(()=>{
        ChatAPI.getMessage(apiroomid)
        .then((res)=>{
        console.log(res);
        dispatch(getPreviousMessages(res.data));
        console.log(res.data);
        
        })
        .catch((error)=>{
        console.log(error);
    })
    },[])
    
    React.useEffect(()=>{

        console.log(`/sub/chat/room/${apiroomid}`)
          
        
        return()=>{
       
            // {messageId: 19, senderId: 2, message: 'asd', date: '2022-05-09T21:58:30.252', isRead: true, …}
    }
    },[])
    React.useEffect(()=>{

        messageref.current.scrollTop=messageref.current.scrollHeight;
        return()=>{
    }
    },[messages])
    
    return(
        <Base ref={messageref}>
        {/* {   listmessage.sort((a,b)=>a.messageId-b.messageId) */}
        {    messages.slice().sort((a,b)=>a.messageId-b.messageId)?.map((message,idx)=>
            message.type==="STATUS"?<NotiMessage key={'keyid'+message.messageId}  message={message.message}></NotiMessage>:message.senderId===Opponent.userId?(<ReceviedMessage key={'keyid'+message.messageId} profile={Opponent.profile} message={message.message}/>):(<Sentmessage key={'keyid'+message.messageId} message={message.message}/>))
            

        }
        </Base>
    );
        
    
};
const Base = styled.div`
    height: calc(100% - 130px);
    padding: 0 16px 10px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;


        


export default MessageList;