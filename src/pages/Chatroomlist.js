import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ChatAPI } from '../shared/api';
import LocationBar from '../components/LocationBar';
import ChatRoom from '../components/chat/ChatRoom';
import TabBar from '../components/TabBar';
import { setRoomlist } from '../redux/modules/chat';

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
            <Container>
                {Roomlist.map((room, idx)=>{
                    return  <ChatRoom  
                                key={idx} 
                                {...room}
                            />;
                })}
                {/* <RoomList roomlist={roomlist}></RoomList> */}
            </Container>
            <TabBar />
        </Base>
    );   
};

const Base = styled.div`
    height: 100%;
`;

const Container = styled.div`
    display: flex;
    padding: 0 16px;
    flex-direction: column;
`;

export default Chatroomlist;