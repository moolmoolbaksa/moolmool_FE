import React from 'react';
import styled from 'styled-components';
import Image2 from '../../elements/Image2';
import { Image } from '../../elements';





const ReceviedMessage = (props) => {
    
    return(
        <Messagewrap>
            <Image2 size='36' shape='circle'></Image2>
            <ChatRecived>
                <Messagetext>recevied message</Messagetext>
            </ChatRecived>
        </Messagewrap>
    );
        
    
};
const Messagewrap=styled.div`
    display:flex;
    margin:20px 0px 0px 0px
    
`;

const ChatRecived=styled.div`
    position:relative;
    
    width:300px;
    height:50px;
    background-color:#FFCA39;
    border-radius:0px 20px 20px 20px;
    margin:0px 0px 0px 20px;
    & :before{
        content:'';
        position:absolute;
        right:100%;
        top:0%;
        
        border-top: 10px solid #FFCA39;
        border-right: 10px solid #FFCA39;
        border-bottom: 10px solid transparent;
        border-left: 10px solid transparent;

        
    }
`;
const Messagetext=styled.p`
    position:absolute;
    width: inherit;
    height: inherit;
    margin: 0;
    padding: 5%;
`;


export default ReceviedMessage;