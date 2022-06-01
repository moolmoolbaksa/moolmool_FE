import React from 'react';
import styled from 'styled-components';

const Sentmessage = ({message,date}) => {
  console.log(date);
    return(
        <Messagewrap date={date}>
            <ChatSender date={date}>
                <Messagetext>{message}</Messagetext>
            </ChatSender>
        </Messagewrap>
    ); 
};

const ChatSender = styled.div`
    position: relative;
    
    max-width: 300px;
    background-color: ${props => props.theme.palette.yellow};
    border-radius: 5px 0px 5px 5px;
    margin: 20px 20px 0px 0px;
    &:before{
      content:"${props=>props.date?props.date:""}";
      position:absolute;
      right:100%;
      bottom:0%;
    }
    &:after{
        content: '';
        position: absolute;
        left: 100%;
        top: 0%;
        
        border-top: 5px solid ${props => props.theme.palette.yellow};
        border-right: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid ${props => props.theme.palette.yellow};  
    }
`;

const Messagetext = styled.p`
    width: inherit;
    height: inherit;
    margin: 0;
    padding: 10px 20px;
    color: black;
    word-break: break-all;
    user-select: text;
`;

const Messagewrap=styled.div`
    display: flex;
    justify-content: flex-end;
    &::before{
      content:'hi';
    }
`;


export default Sentmessage;