import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { Button } from '../../elements';
import { useParams } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {moveScroll} from '../../redux/modules/chat'

const Inputbox = (props) => {
  const messageInput =useRef(null);
  const [message,setMessage]=useState("");
  const roomId=useParams();
  const dispatch=useDispatch();
    
  const roomtype=useSelector(state=>state.chat.Currentroom.type);
  const isBanned=useSelector(state=>state.chat.Currentroom.isBanned);

  let isRead = roomtype === "NORMAL" ? false : true;

  const Sentroomid=parseInt(roomId.roomid);
  console.log('roomtype: '+roomtype);
  console.log();

    
  const onSend = () => {
    console.log("connected");
    console.log(props.client.ws.readyState);
    // 공백일 때 실행되지 못하게 막기
    if(!message) return;
    const text = {
      roomId: Sentroomid,
      message: message,
      isRead: isRead,
      type: 'TALK',
    }
    props.client.send('/pub/chat/message', 
      {"Authorization": `${localStorage.getItem('accessToken')}`},
      JSON.stringify(text)
    );
    setMessage("");
    messageInput.current.value = "";
  }
  const handlemoveScroll=()=>{
    console.log('moveScroll');
    dispatch(moveScroll());

  }

  const handleMessage=(e)=>{
    setMessage(e.target.value);
  };

	const onDoEnter = (e) => {
		if(e.keyCode === 13) onSend();
	};
  
  return(
    <Base>
      {isBanned 
        ? <>
            <Input 
              placeholder="차단 되었습니다." 
              type="text" 
              ref={messageInput} 
              onChange={handleMessage} 
              onKeyDown={onDoEnter}
              disabled
            />
            <Button 
              background="gray" 
              radius="5px"
              size="16px"
              width="20%" 
              disabled
            >전송</Button></>
        :
          <>
            <Input 
              placeholder="메시지를 입력해주세요" 
              type="text" 
              ref={messageInput} 
              onChange={handleMessage} 
              onKeyDown={onDoEnter}
              onClick={handlemoveScroll}
            />
            <Button 
              background="yellow" 
              radius="5px"
              size="16px"
              width="20%" 
              height="100%"
              onClick={onSend}
              disabled={!message}
            >전송</Button></>
      }
    </Base>
  );
};

const Base = styled.div`
	display: flex;
	gap: 10px;
	width: 100%;
	height: 60px;
	position: absolute ;
	bottom: 0;
	padding: 0px 16px 15px;
`;

const Input = styled.input`
	width: 80%;
	border: 1px #E8E8E8 solid;
	padding: 12px 15px;
	border-radius: 5px;
	outline: none;
	font-size: 16px;

	&::placeholder {
		color: #979797;
		letter-spacing: -.67px;
	}
`;

export default Inputbox;