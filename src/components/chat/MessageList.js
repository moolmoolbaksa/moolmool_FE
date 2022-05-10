import React, { useState } from 'react';
import styled from 'styled-components';
import { Image } from '../../elements';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useParams } from 'react-router-dom';
import ReceviedMessage from './ReceviedMessage';
import Sentmessage from './Sentmessage';

import { ChatAPI } from '../../shared/api';

import {useDispatch,useSelector} from 'react-redux';
import {getPreviousMessages,addMessage,changeRoomtype} from '../../redux/modules/chat'

const Base=styled.div`
height:80vh;
overflow:auto;
`;



const MessageList = (props) => {
    const dispatch=useDispatch();


    const {premessages, opponentId, opponentProfile}=props;
    const roomid=useParams();
    const [listmessage,setListmessage]=useState([]);

    const Opponent=useSelector(state=>state.chat.Opponent);
    const currentroom=useSelector(state=>state.chat.Currentroom);
    const messages=useSelector(state=>state.chat.messages);
    
    const messageref=React.useRef(null);


    const apiroomid=roomid.roomid;

    React.useEffect(()=>{
        ChatAPI.getMessage(apiroomid)
        .then((res)=>{
        console.log(res);
        dispatch(getPreviousMessages(res.data));
        
        })
        .catch((error)=>{
        console.log(error);
    })
    },[])
    React.useEffect(()=>{

        let sock = new SockJS('http://13.124.0.71/ws-stomp');
        let client = Stomp.over(sock);
        console.log(client.ws.readyState);
        client.connect({"Authorization": `${localStorage.getItem('token')}`},function() {
          console.log("connected");
          console.log(client.ws.readyState);
          client.subscribe(`/sub/chat/room/${apiroomid}`, function(data) {
              const newMessage = JSON.parse(data.body);
              console.log(client.ws.readyState);
              
              console.log(data.body);
              const messageFromServer=JSON.parse(data.body);
              // {"messageId":21,"senderId":2,"message":"fffff","date":"2022-05-09T21:58:58.756","isRead":false,"type":"TALK"}
                if(messageFromServer.type=="TALK")
                {
                    dispatch(addMessage(messageFromServer))
                }
                else if(messageFromServer.type=="FULL")
                {
                    dispatch(changeRoomtype("FULL"));
                }
          },{"Authorization": `${localStorage.getItem('token')}`}
          );
        });
    
        
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
            message.senderId==opponentId?(<ReceviedMessage key={'keyid'+message.messageId} profile={opponentProfile} message={message.message}/>):(<Sentmessage key={'keyid'+message.messageId} message={message.message}/>))
            

        }
        </Base>
    );
        
    
};



export default MessageList;