import React from 'react';
import styled from 'styled-components';

const Sentmessage = ({message}) => {
    return(
        <Messagewrap>
            <ChatSender>
                <Messagetext>{message}</Messagetext>
            </ChatSender>
        </Messagewrap>
    ); 
};

const ChatSender = styled.div`
    position: relative;
    
    max-width: 300px;
    background-color: ${props => props.theme.palette.blue};
    border-radius: 5px 0px 5px 5px;
    margin: 20px 20px 0px 0px;
    
    &:after{
        content: '';
        position: absolute;
        left: 100%;
        top: 0%;
        
        border-top: 5px solid ${props => props.theme.palette.blue};
        border-right: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid ${props => props.theme.palette.blue};  
    }
`;

const Messagetext = styled.p`
    width: inherit;
    height: inherit;
    margin: 0;
    padding: 10px 20px;
    color: white;
    word-break: break-all;
    user-select: text;
`;

const Messagewrap=styled.div`
    display: flex;
    justify-content: flex-end;
`;


export default Sentmessage;