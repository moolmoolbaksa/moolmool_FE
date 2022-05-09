import React from 'react';
import styled from 'styled-components';
import LocationBar from '../components/LocationBar';
import Inputbox from '../components/chat/Inputbox';
import MessageList from '../components/chat/MessageList';
import NotiMessage from '../components/chat/NotiMessage';
import ReceviedMessage from '../components/chat/ReceviedMessage';
import Sentmessage from '../components/chat/Sentmessage';
import {useParams } from "react-router-dom";
import { ChatAPI } from '../shared/api';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useSelector } from 'react-redux';

const Base=styled.div`
position:relative;
height:100vh;
`;


const ChatroomDetail = (props) => {
    const {nickname, profile} = useSelector(state => state.user.user_info);
    const [listmessage,setListmessage]=React.useState([]);
    const roomid=useParams();
    // console.log(roomid);
    // console.log('detail page roomid: '+roomid.roomid);
    const apiroomid=roomid.roomid;
    

    
    React.useEffect(()=>{
        ChatAPI.getMessage(apiroomid)
        .then((res)=>{
        console.log(res);
        console.log('detail page roomid'+apiroomid);
        setListmessage((arr)=>[...arr,res.data]);
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
          window.alert("got message with body ");
          const data={
              roomId:roomid.roomid,
            type:"IN"
          }
          client.send(`/pub/chat/connect-status`,{"Authorization": `${localStorage.getItem('token')}`},
            JSON.stringify(data)
          );
          window.alert('room in')
          console.log('send room in');
        });
   
    
        return()=>{
       

    }
    },[])


    return(
        <Base>
            <LocationBar title="Username" />
            <MessageList>
                <ReceviedMessage/>
                <Sentmessage/>
                <Sentmessage/>
                <Sentmessage/>
                <ReceviedMessage/>
            </MessageList>
            <Inputbox ></Inputbox>
        </Base>
    );
        
    
};
const Meesagebox=styled.div`
    // diplay:flex;
    // poistion:relative;
    // justify-content:flex-end;
`;

const Messagewrap=styled.div`
    diplay:flex;
    poistion:relative;
    justify-contents:flex-end;
    margin:0px 30px;

`;
const ChatboxSender=styled.div`
	position: relative;
	background: #cfd575;
    & :after{
        left: 100%;
        top: 50%;
        border: solid transparent;
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(207, 213, 117, 0);
        border-left-color: #cfd575;
        border-width: 30px;
        margin-top: -30px;

    }
`;
const ChatSender=styled.div`
    position:relative;
    
    width:300px;
    height:80px;
    background-color:#0095B7;
    border-radius:20px 0px 20px 20px;
    margin:30px 0px;
    & :after{
        content:'';
        position:absolute;
        left:100%;
        top:0%;
        
        border-top: 10px solid #0095B7;
        border-right: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid #0095B7;

        
    }
`;
const Messagetext=styled.p`
    position:absolute;
    width: inherit;
    height: inherit;
    margin: 0;
    padding: 5%;
`;


export default ChatroomDetail;