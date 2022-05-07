import React from 'react';
import styled from 'styled-components';
import { Image } from '../../elements';
import { history } from '../../redux/configureStore';
const Base = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid ${({ color }) => color};
`;



const AvatarWrapper = styled.div`
  width: 48px;
  height: 48px;
`;

const Content = styled.div`
  flex: 0 1 250px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;
const Username = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 600;
`;
const LastMessage = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 8px 0 0 0;
  padding: 0;
  font-size: 12px;
  color: ${({ color }) => color};
`;
const SentAtWrapper = styled.div`
  flex: 0 1 36px;
  text-align: center;
  font-size: 12px;
`;
const SentAt = styled.time``;




const ChatRoom = (props) => {

    const {roomId, nickname,lastmessage, lastmessagesentAt, profile, message}=props;
    return(
        <Base onClick={()=>{history.push(`/chat/${roomId}`)}}>
            <AvatarWrapper>
                <Image src={profile}>
                </Image>
            </AvatarWrapper>
            <Content >
                <Username>{nickname}</Username>
                <LastMessage>{message}</LastMessage>
                <SentAtWrapper>
                    <SentAt>2021-05-06</SentAt>
                </SentAtWrapper>
            </Content>
        </Base>

    );
        
    
};



export default ChatRoom;