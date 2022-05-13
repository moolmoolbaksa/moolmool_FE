import React from 'react';
import styled from 'styled-components';
import LocationBar from '../components/LocationBar';
import Inputbox from '../components/chat/Inputbox';
import MessageList from '../components/chat/MessageList';
import NotiMessage from '../components/chat/NotiMessage';

import {useParams } from "react-router-dom";
import { ChatAPI } from '../shared/api';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector} from 'react-redux';
import {getPreviousMessages,addMessage,changeRoomtype} from '../redux/modules/chat';
const Base=styled.div`
position:relative;
height:100vh;
`;


const ChatroomDetail = (props) => {
    const dispatch=useDispatch();
    const roomid=useParams();

    const Opponent=useSelector(state=>state.chat.Opponent);
    const currentroom=useSelector(state=>state.chat.Currentroom);

    console.log(Opponent);
    
    // 내프로필은 필요없는걸로
    // const {nickname, profile} = useSelector(state => state.user.user_info);

    
    //params parameter
    const apiroomid=roomid.roomid;
    
    //history props
    const opponentId=Opponent.userId;
    const opponentProfile=Opponent.profile;
    const opponentNickname=Opponent.nickname;
    
    
    let sock = new SockJS('https://13.125.220.67:8080/ws-stomp');
    let client = Stomp.over(sock);
    React.useEffect(()=>{

        //입장할때 IN 들어왔다는 메시지 Send
        // console.log(client.ws.readyState);
        //   const data={
        //       roomId:roomid.roomid,
        //     type:"IN"
        //   }
        //   client.send(`/pub/chat/connect-status`,{"Authorization": `${localStorage.getItem('token')}`},
        //     JSON.stringify(data)
        //   );

        // console.log(client.ws.readyState);
        client.connect({"Authorization": `${localStorage.getItem('token')}`},function() {
          console.log("connected");
          console.log(client.ws.readyState);
          const data={
              roomId:roomid.roomid,
            type:"IN"
          }
          client.send(`/pub/chat/connect-status`,{"Authorization": `${localStorage.getItem('token')}`},
            JSON.stringify(data)
          );
          window.alert('room in')
          console.log('send room in');
          console.log(client.ws.readyState);
        client.subscribe(`/sub/chat/room/${apiroomid}`, function(data) {
            console.log(client.ws.readyState);
            console.log(data.body);
            const messageFromServer=JSON.parse(data.body);
            // {"messageId":21,"senderId":2,"message":"fffff","date":"2022-05-09T21:58:58.756","isRead":false,"type":"TALK"}
              if(messageFromServer.type==="TALK")
              {
                dispatch(addMessage(messageFromServer))
              }
              else if(messageFromServer.type==="FULL")
              {
                  dispatch(changeRoomtype("FULL"));
              }
        }, {"Authorization": localStorage.getItem('token')}
        );
        });
   
    
        return()=>{
            const data={
                roomId:roomid.roomid,
                type:"OUT"
            }
            client.send(`/pub/chat/connect-status`,{"Authorization": `${localStorage.getItem('token')}`},
            JSON.stringify(data)
            );
            client.disconnect();
            //방퇴장할때 OUT 했다는 메시지 Send
       

    }
    },[])


    return(
        <Base>
            <LocationBar title="Username" />
            <MessageList/>
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