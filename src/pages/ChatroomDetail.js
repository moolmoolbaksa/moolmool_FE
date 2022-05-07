import React from 'react';
import styled from 'styled-components';
import LocationBar from '../components/LocationBar';
import Inputbox from '../components/chat/Inputbox';
import MessageList from '../components/chat/MessageList';
import NotiMessage from '../components/chat/NotiMessage';
import ReceviedMessage from '../components/chat/ReceviedMessage';
import Sentmessage from '../components/chat/Sentmessage';
import {useParams } from "react-router-dom";
const Base=styled.div`
position:relative;
height:100vh;
`;


const ChatroomDetail = (props) => {
    const roomId=useParams();
    console.log(roomId)
    return(
        <Base>
            <LocationBar title="Username" />
            <MessageList>
                <NotiMessage>asd</NotiMessage>
                <Sentmessage>asd</Sentmessage>
                <Sentmessage>asd</Sentmessage>
                <Sentmessage></Sentmessage>
                <ReceviedMessage></ReceviedMessage>
                <ReceviedMessage></ReceviedMessage>
                <ReceviedMessage></ReceviedMessage>
                <Sentmessage></Sentmessage>
                <Sentmessage></Sentmessage>
                <ReceviedMessage></ReceviedMessage>
            </MessageList>
            <Inputbox ></Inputbox>
        </Base>
    );
        
    
};



export default ChatroomDetail;