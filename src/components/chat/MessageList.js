import React from 'react';
import styled from 'styled-components';
import { Image } from '../../elements';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useParams } from 'react-router-dom';
import ReceviedMessage from './ReceviedMessage';
import Sentmessage from './Sentmessage';
const Base=styled.div`
height:80vh;
`;



const MessageList = (props) => {
    const roomid=useParams();
        const apiroomid=roomid.roomid;
        console.log(roomid);

    React.useEffect(()=>{
        let sock = new SockJS('http://13.124.0.71/ws-stomp');
        let client = Stomp.over(sock);
        console.log(client.ws.readyState);
        client.connect({"Authorization": `${localStorage.getItem('token')}`},function() {
          console.log("connected");
          console.log(client.ws.readyState);
        //   window.alert("got message with body ");
          client.subscribe(`/sub/chat/room/${apiroomid}`, function(data) {
              const newMessage = JSON.parse(data.body);
              console.log(client.ws.readyState);
              console.log(data.body);
              if (data.body) {
                window.alert("got message with body " + data.body)
              } else {
                window.alert("got empty message");
              }
              // setListmessage((previous)=>[...previous,newdata]);
          },{"Authorization": `${localStorage.getItem('token')}`}
          );
        });
    
    
        return()=>{
       
    
    }
    },[])
    
    return(
        <Base>{props.children}
            <ReceviedMessage>

            </ReceviedMessage>
        </Base>
    );
        
    
};



export default MessageList;