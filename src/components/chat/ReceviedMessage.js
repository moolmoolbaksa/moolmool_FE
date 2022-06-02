import React from 'react';
import styled from 'styled-components';
import Image2 from '../../elements/Image2';

const ReceviedMessage = ({message, isRead, profile, nickname, date}) => {
  console.log(date);
  const date1=date.split('T')[1].slice(0,5);
    return(
        <Messagewrap>
            <Image2 size='36' shape='circle' src={profile}></Image2>
            <ChatRecived date={date1}>
                <Messagetext>{message}</Messagetext>
            </ChatRecived>
        </Messagewrap>
    );
};

const Messagewrap = styled.div`
    display: flex;
    margin: 20px 0px 0px 16px;
`;

const ChatRecived = styled.div`
    position: relative;
    max-width: 300px;
    // background-color: ${props => props.theme.palette.yellow};
    background-color: ${props => props.theme.palette.white };
    border-radius: 0px 5px 5px 5px;
    margin: 5px 0px 0px 10px;
    
    &:before{
      ${props => props.is_check ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),' : ''} url('${props => props.src}');
        content: '';
        position: absolute;
        right: 100%;
        top: 0%;
        
        border-top: 5px solid ${props => props.theme.palette.white};
        border-right: 5px solid ${props => props.theme.palette.white};
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;        
    }
    &:after{
      content:"${props=>props.date?props.date:""}";
      font-size:0.9rem;
      position:absolute;
      left:105%;
      bottom:0%;
      width:40px;
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