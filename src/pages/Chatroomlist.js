import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ChatAPI } from '../shared/api';
import { setRoomlist } from '../redux/modules/chat';
import LocationBar from '../components/LocationBar';
import ChatRoom from '../components/chat/ChatRoom';
import TabBar from '../components/TabBar';
import banner from '../images/servey_banner.png';

const Chatroomlist = (props) => {
    const dispatch = useDispatch();
    const Roomlist = useSelector(state => state.chat.Roomlist);

    React.useEffect(()=>{
        ChatAPI.getChatRoom()
            .then((res)=>{
                dispatch(setRoomlist(res.data));
                console.log(res.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }, []);

    return(
        <Base>
            <LocationBar title="채팅"/>
            <BannerAnchor target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeQtgLQ76wO2sXc69QuvjwtiwdcKgK4sNe2UwU1uHyZLPxSUA/viewform?embedded=true">
                <BannerImg src={banner} alt="설문조사 배너"/>
            </BannerAnchor>
            <Container>
                {Roomlist.map((room, idx)=>{
                    return  <ChatRoom  
                                key={idx} 
                                {...room}
                            />;
                })}
                {/* <RoomList roomlist={roomlist}></RoomList> */}
            </Container>
            <TabBar position/>
        </Base>
    );   
};

const Base = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
`;

const Container = styled.div`
    display: flex;
    padding: 0 16px;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const BannerAnchor = styled.a``;

const BannerImg = styled.img`
    width: 100%;
`;

export default Chatroomlist;