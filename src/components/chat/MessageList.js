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

const MessageList = (props) => {
        
    const dispatch=useDispatch();
    
    let sock = new SockJS('https://13.125.220.67:443/wss-stomp');
    let client = Stomp.over(sock);
    
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
        // console.log(res);
        dispatch(getPreviousMessages(res.data));
        
        })
        .catch((error)=>{
        console.log(error);
    })
    },[])
    
    React.useEffect(()=>{

        console.log(`/sub/chat/room/${apiroomid}`)
        // console.log(client.ws.readyState);
        // client.subscribe(`/sub/chat/room/${apiroomid}`, function(data) {
        //     console.log(client.ws.readyState);
        //     console.log(data.body);
        //     const messageFromServer=JSON.parse(data.body);
        //     // {"messageId":21,"senderId":2,"message":"fffff","date":"2022-05-09T21:58:58.756","isRead":false,"type":"TALK"}
        //       if(messageFromServer.type==="TALK")
        //       {
        //           dispatch(addMessage(messageFromServer))
        //       }
        //       else if(messageFromServer.type==="FULL")
        //       {
        //           dispatch(changeRoomtype("FULL"));
        //       }
        // }
        // );
        // client.connect({"Authorization": `${localStorage.getItem('token')}`},function() {
        //   console.log("connected");
        //   console.log(client.ws.readyState);
        //   client.subscribe(`/sub/chat/room/${apiroomid}`, function(data) {
        //       console.log(client.ws.readyState);
        //       console.log(data.body);
        //       const messageFromServer=JSON.parse(data.body);
        //       // {"messageId":21,"senderId":2,"message":"fffff","date":"2022-05-09T21:58:58.756","isRead":false,"type":"TALK"}
        //         if(messageFromServer.type==="TALK")
        //         {
        //             dispatch(addMessage(messageFromServer))
        //         }
        //         else if(messageFromServer.type==="FULL")
        //         {
        //             dispatch(changeRoomtype("FULL"));
        //         }
        //   },
        //   );
        // });
    
        
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
            message.senderId===Opponent.userId?(<ReceviedMessage key={'keyid'+message.messageId} profile={Opponent.profile} message={message.message}/>):(<Sentmessage key={'keyid'+message.messageId} message={message.message}/>))
            

        }
        </Base>
    );
        
    
};
const Base = styled.div`
    height: calc(100% - 130px);
    padding: 0 16px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }
`;


        


export default MessageList;