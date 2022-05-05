import React from 'react';
import styled from 'styled-components';
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
const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
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
    const {roomid, username,lastmessage, lastmessagesentAt}=props;
    return(
        <Base>
            <AvatarWrapper>
                <Avatar>
                    <h1>img </h1>
                </Avatar>
            </AvatarWrapper>
            <Content>
                <Username>{username}</Username>
           
                <LastMessage>{lastmessage}</LastMessage>
                <SentAtWrapper>
                    <SentAt>{lastmessagesentAt}</SentAt>
                </SentAtWrapper>
            </Content>
        </Base>

    );
        
    
};



export default ChatRoom;