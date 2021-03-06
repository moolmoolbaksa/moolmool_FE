import React from 'react';
import styled from 'styled-components';
import LocationBar from '../components/LocationBar';
import Inputbox from '../components/chat/Inputbox';
import MessageList from '../components/chat/MessageList';
import NotiMessage from '../components/chat/NotiMessage';

import { useParams } from 'react-router-dom';
import { ChatAPI } from '../shared/api';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getPreviousMessages, addMessage, changeRoomtype } from '../redux/modules/chat';
import { ReactComponent as ArrowIcon } from '../images/arrow.svg';
import { history } from '../redux/configureStore';
import Drawer from '../components/modal/Drawer';
import { BsThreeDotsVertical } from "react-icons/bs";
import AlertModal from '../components/modal/AlertModal';
const ChatroomDetail = props => {
    const dispatch = useDispatch();
    const roomid = useParams();
    const [ModalOpen, setModalOpen] = React.useState(false);
    const Opponent = useSelector(state => state.chat.Opponent);
    const currentroom = useSelector(state => state.chat.Currentroom);

    // 내프로필은 필요없는걸로
    // const {nickname, profile} = useSelector(state => state.user.user_info);

    //params parameter
    const apiroomid = roomid.roomid;

    //history props
    let sock = new SockJS(`${process.env.REACT_APP_SOCKET_URL}`);
    let client = Stomp.over(sock);

    //stomp update...
    // var client = Stomp.over(function(){
    //   return new SockJS('http://13.124.0.71/ws-stomp')
    // });
    // // var client = Stomp.client('http://localhost:3000/ws-stomp');

    // client.webSocketFactory= function () {
    //   return new WebSocket("ws://13.124.0.71/ws-stomp");
    // };

    const openModal = () => {
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
    };
    
    React.useEffect(() => {
        client.connect({ Authorization: `${localStorage.getItem('accessToken')}` }, function () {
            console.log('connected');
            console.log(client.ws.readyState);
            client.subscribe(
                `/sub/chat/room/${apiroomid}`,
                function (messagefs) {
                  console.log('apiroomid');
                    console.log(client.ws.readyState);
                    console.log(messagefs.body);
                    const messageFromServer = JSON.parse(messagefs.body);
                    // {"messageId":21,"senderId":2,"message":"fffff","date":"2022-05-09T21:58:58.756","isRead":false,"type":"TALK"}
                    if (messageFromServer.type === 'TALK') {
                        dispatch(addMessage(messageFromServer));
                    } else if (messageFromServer.type === 'FULL') {
                        dispatch(changeRoomtype('FULL'));
                    }
                },
                { Authorization: localStorage.getItem('accessToken') },
            );
            const data = {
                roomId: roomid.roomid,
                type: 'IN',
            };
            client.send(
                `/pub/chat/connect-status`,
                { Authorization: `${localStorage.getItem('accessToken')}` },
                JSON.stringify(data),
            );
            //   window.alert('room in')
            console.log('send room in');
            console.log(client.ws.readyState);
        });

        return () => {
            const data = {
                roomId: roomid.roomid,
                type: 'OUT',
            };
            client.send(
                `/pub/chat/connect-status`,
                { Authorization: `${localStorage.getItem('accessToken')}` },
                JSON.stringify(data),
            );
            client.disconnect(
                () => {
                    client.unsubscribe('sub-0');
                },
                { Authorization: `${localStorage.getItem('accessToken')}` },
            );       
            dispatch(getPreviousMessages([]));
            
            //방퇴장할때 OUT 했다는 메시지 Send
        };
    }, []);

    return (
        <Base>
            <Wrap>
                <StyledArrowIcon
                    onClick={() => {
                        history.goBack();
                    }}
                    width="30"
                    height="30"
                />
                
                {/* <label htmlFor='date1'>calender</label> 
                <Calender type="date" id="date1" style={{display:'hidden'}} ></Calender> */}
                
                <span>{Opponent.nickname}</span>
                <Styled3dots onClick={openModal}/>
                {/* <Drawer open={ModalOpen}closeModal={closeModal}></Drawer> */}
                {/* closeModal */}
                {ModalOpen&&<Drawer userId={Opponent.userId} roomid={apiroomid} onclose={closeModal}></Drawer>}
            </Wrap>
            <MessageList />
            <Inputbox isBanned={currentroom.isBanned} client={client}></Inputbox>
            <AlertModal>이미 차단된 유저입니다</AlertModal>
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
    background:#FFD467;

    & span {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: -0.67px;
    }
`;

const Styled3dots= styled(BsThreeDotsVertical)`
  cursor: pointer;
  position: absolute;
  right: 10px;
  width: auto;
  height: 25px;
`;

const StyledArrowIcon = styled(ArrowIcon)`
    position: absolute;
    left: 8px;
    cursor: pointer;
`;
const Calender=styled.input`
    background-color:#0080ff;
    padding:15px;
    position:absolute;
    transform: translate(-50%,-50%);
    top:50%;
    left:50%;
    color:white;
    font-size:16px;
    border:none;
    outline:none;
    &::-webkit-calendar-picker-indicator {
      background-color:yellow;
    }
`;

export default ChatroomDetail;
