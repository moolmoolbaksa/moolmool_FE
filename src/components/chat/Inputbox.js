import { set } from 'lodash';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Image } from '../../elements';
import { history } from '../../redux/configureStore';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useParams } from 'react-router-dom';
import { ReactReduxContext } from 'react-redux';
import {useDispatch,useSelector} from 'react-redux';
// 전송소켓 작성




const Inputbox = (props) => {
    const token = localStorage.getItem("token")
    const messageInput =useRef(null);
    const [message,setMessage]=useState("");
    const roomId=useParams();
    
    const roomtype=useSelector(state=>state.chat.Currentroom.type);
    let isRead=roomtype==="NORMAL"?false:true;

    const Sentroomid=parseInt(roomId.roomid);
    
    React.useEffect(()=>{


      return()=>{
        //clean up socket disconnect 작성
      };



    },[])
    const onSend = async () => {

      let sock = new SockJS('http://13.124.0.71/ws-stomp');
      let client = Stomp.over(sock);
      console.log(client.ws.readyState);

      client.connect({"Authorization": `${localStorage.getItem('token')}`},function() {
        console.log("connected");
        console.log(client.ws.readyState);
        const text = {
                  roomId: Sentroomid,
                  message: message,
                  isRead: isRead,
                  type: 'TALK',
                }
        client.send(
          '/pub/chat/message',
          { "Authorization": `${localStorage.getItem('token')}` },
          JSON.stringify(text)
        );
                setMessage("");
        messageInput.current.value="";
      })
    //     try {
    //       if (!token) {
    //         alert('문제가 발생했습니다. 다시 로그인 해주세요.');
    //       }
    //       // send할 데이터
    //       const text = {
    //         roomId: roomId.roomid,
    //         message: message,
    //         isRead: true,
    //         type: 'TALK',
    //       }
    //       // 빈문자열이면 리턴
    // if (message === '') {
    //     return;
    //   }
    //   // 로딩 중
    //   waitForConnection(ws, function () {
    //     ws.send(
    //       '/pub/chat/message',
    //       { token: token },
    //       JSON.stringify(text)
    //     );
    //     console.log(ws.ws.readyState);
    //     setMessage("");
    //     messageInput.current.value="";
    //   });
    // } catch (error) {
    //   console.log(error);
    //   console.log(ws.ws.readyState);
    // }
  }
  
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          console.log(ws.ws.readyState)
          callback();
          
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }


    const handleMessage=(e)=>{
        setMessage(e.target.value);
        // console.log(e.target.value);
    }
    
    return(
        <Base>
            <input style={{width:'400px'}} placeholder="메시지를 입력해주세요" type="text" ref={messageInput} onChange={handleMessage}></input>
            <Button width='50px' background="orange" text="전송" onClick={onSend}></Button>
        </Base>
    );
        
    
};



const Base=styled.div`
    display:flex;
    height:10vh;
    width:100%;
    position:absolute ;
    left:0;
    right:0;
    bottom:0;
    padding:10px;
`;


export default Inputbox;