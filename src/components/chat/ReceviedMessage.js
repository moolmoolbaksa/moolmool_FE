import React from 'react';
import styled from 'styled-components';
import Image2 from '../../elements/Image2';

const ReceviedMessage = ({message, isRead, profile, nickname}) => {
    return(
        <Messagewrap>
            <Image2 size='36' shape='circle' src={profile}></Image2>
            <ChatRecived>
                <Messagetext>{message}</Messagetext>
            </ChatRecived>
        </Messagewrap>
    );
};

const Messagewrap = styled.div`
    display: flex;
    margin: 20px 0px 0px 0px;
`;

const ChatRecived = styled.div`
    position: relative;
    max-width: 300px;
    background-color: #FFD467;
    border-radius: 0px 5px 5px 5px;
    margin: 5px 0px 0px 10px;
    
    &:before{
        content: '';
        position: absolute;
        right: 100%;
        top: 0%;
        
        border-top: 5px solid #FFD467;
        border-right: 5px solid #FFD467;
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;        
    }
`;

const Messagetext = styled.div`
    width: inherit;
    height: inherit;
    padding: 10px 20px;
    word-break: break-all;
    user-select: text;
`;

export default ReceviedMessage;