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
import { ReactComponent as ArrowIcon } from "../images/화살표.svg";
import { history } from '../redux/configureStore';

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
    
    
    let sock = new SockJS('http://13.124.0.71/ws-stomp');
    let client = Stomp.over(sock);
    React.useEffect(()=>{
        client.connect({"Authorization": `${localStorage.getItem('token')}`},function() {
          console.log("connected");
          console.log(client.ws.readyState);
          client.subscribe(`/sub/chat/room/${apiroomid}`, function(messagefs) {
            console.log(client.ws.readyState);
            console.log(messagefs.body);
            const messageFromServer=JSON.parse(messagefs.body);
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
          const data={
              roomId:roomid.roomid,
            type:"IN"
          }
          client.send(`/pub/chat/connect-status`,{"Authorization": `${localStorage.getItem('token')}`},
            JSON.stringify(data)
          );
        //   window.alert('room in')
          console.log('send room in');
          console.log(client.ws.readyState);
        
        });
   
    
        return()=>{
            const data={
                roomId:roomid.roomid,
                type:"OUT"
            }
            client.send(`/pub/chat/connect-status`,{"Authorization": `${localStorage.getItem('token')}`},
            JSON.stringify(data)
            );
            client.disconnect(()=>{client.unsubscribe('sub-0')},{"Authorization": `${localStorage.getItem('token')}`});
            //방퇴장할때 OUT 했다는 메시지 Send
       

    }
    },[])


    return(
        <Base>
            <Wrap>
                <StyledArrowIcon onClick={() => {history.goBack()}} width="27" height="27"/>
                <span>{Opponent.nickname}</span>
            </Wrap>
            <MessageList/>
            <Inputbox client={client} ></Inputbox>
        </Base>
    );  
};

const Base = styled.div`
    height: 100%;
`;

const Wrap = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    & span {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: -.67px;
    }
`;

const StyledArrowIcon = styled(ArrowIcon)`
    position: absolute;
    left: 8px;
    cursor: pointer;
`;

export default ChatroomDetail;