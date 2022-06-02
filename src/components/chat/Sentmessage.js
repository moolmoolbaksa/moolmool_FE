import React from 'react';
import styled from 'styled-components';

const Sentmessage = ({message,date}) => {
  console.log(date);
  const date1=date.split('T')[1].slice(0,5);
  // const monthdate=
  console.log(date1);
    return(
        <Messagewrap date={date1}>
            <ChatSender date={date1}>
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
      font-size:0.9rem;
      position:absolute;
      right:100%;
      bottom:0%;
      width:40px;
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
`;


export default Sentmessage;