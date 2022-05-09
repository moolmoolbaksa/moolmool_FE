import React from 'react';
import styled from 'styled-components';
import { Image } from '../../elements';





const Sentmessage = (props) => {
    
    return(
        <Messagewrap>
            <ChatSender>
                <Messagetext>안녕하세요</Messagetext>
            </ChatSender>
        </Messagewrap>
    );
        
    
};

const ChatSender=styled.div`
    position:relative;
    
    width:300px;
    height:50px;
    background-color:#0095B7;
    border-radius:20px 0px 20px 20px;
    margin:20px 20px 0px 0px;
    & :after{
        content:'';
        position:absolute;
        left:100%;
        top:0%;
        
        border-top: 10px solid #0095B7;
        border-right: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid #0095B7;

        
    }
`;
const Messagetext=styled.p`
    position:absolute;
    width: inherit;
    height: inherit;
    margin: 0;
    padding: 5%;
`;
const Messagewrap=styled.div`
    display:flex;
    justify-content:flex-end;
`;


export default Sentmessage;