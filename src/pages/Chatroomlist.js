import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ChatAPI } from '../shared/api';
import { setRoomlist } from '../redux/modules/chat';
import LocationBar from '../components/LocationBar';
import ChatRoom from '../components/chat/ChatRoom';
import TabBar from '../components/TabBar';
import banner from '../images/servey_banner.png';
import { ReactComponent as EmptyIcon } from '../images/outline_error_outline_black_48pt_2x 1.svg';
import { Grid } from '../elements/index';

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
            <LocationBar title="채팅" color="yellow"/>
            <BannerAnchor target="blank" rel="external" href="https://docs.google.com/forms/d/e/1FAIpQLSeQtgLQ76wO2sXc69QuvjwtiwdcKgK4sNe2UwU1uHyZLPxSUA/viewform?embedded=true">
                <BannerImg src={banner} alt="설문조사 배너"/>
            </BannerAnchor>
            <Container>
                {Roomlist.length
                    ?   Roomlist.map((room, idx) => {
                            return  <ChatRoom  
                                        key={idx} 
                                        {...room}
                                    />;
                        })
                    :   <Wrap>
                            <EmptyIcon />
                            <Grid is_flex is_column gap="3px">
                                <Text>개설된 채팅방이 없습니다.</Text> 
                            </Grid>
                        </Wrap>
                }
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

const Wrap = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-grow: 1;
    overflow: hidden;
`;

const Text = styled.div`
    font-size: 18px;
    color: #9d9d9d;
    word-spacing: -2px;
    letter-spacing: -1px;
    text-align: center;
`;

export default Chatroomlist;