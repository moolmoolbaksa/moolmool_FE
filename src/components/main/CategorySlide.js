import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemText from '@mui/material/ListItemText';

import React, { useRef, useState } from 'react';
import styled,{ keyframes} from 'styled-components';

import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { ChatAPI } from '../../shared/api';
import { yellow } from '@mui/material/colors';
import { history } from '../../redux/configureStore';

const Drawer = (props) => {
  console.log(props);
  console.log(props.onclose);
  console.log(props.roomid);
  console.log(props.userId);
  const ban=()=>{
    console.log('ban');
    ChatAPI.banUser(props.userId)
    .then((res)=>{
      console.log(res);

    })
    .catch((error)=>{
      console.log(error);
    })
  }
  const exitroom=()=>{
		ChatAPI.exitRoom(props.roomid)
			.then((res)=>{
				console.log(res);
        history.push('/chat')
			})
			.catch((err)=>{
				console.log(err);
			})
	};

  return(
    <ModalBackground onClick={props.onclose}>
      <Modalcontents onClick={(e)=>{e.stopPropagation();}}>
        <Buttonwrap BR="15px 15px 0 0">
          <Button  height="" BR="15px 15px 0 0"onClick={(e)=>{e.stopPropagation();exitroom();}}><p>채팅방 나가기</p></Button>
          <Button  height="" onClick={(e)=>{e.stopPropagation();ban();}}><p>차단하기</p></Button>
          <Button  height="" yellow={true} onClick={(e)=>{e.stopPropagation();props.onclose()}}><p>취소</p></Button>

        </Buttonwrap>
          
        </Modalcontents>
    </ModalBackground>
  );
};
const boxFade = keyframes`
  from {
    opacity: 1;
    transform: translateY(50px);

  }
  to {
    opacity: 1;
    transform: translateY(-50px);

  }
`;
const ModalBackground = styled.div`
    position: absolute;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    // pointer-events:none;
`;
const Modalcontents=styled.div`
  position:fixed;  
  width:420px;
  max-width: 420px;
  height: ${props=>props.height?props.height:'200px'};
  border-radius: 10px 10px 0 0;
  background: white;
  bottom: -50px;
  
  transform: translateY(-50px);
  animation: ${boxFade} 0.2s linear alternate;
  z-index:10001;
  `;
  const Buttonwrap=styled.div`
  display:flex;
  flex-flow:column;
  height:inherit;
  background:white;
  border-radius:${props=>props.BR?props.BR:""};
  z-index:10002;
  `
  const Button=styled.div`
    background:${props=>props.yellow?`${props.theme.palette.yellow}`:'white'};
    border-bottom: 1px solid grey;
    text-align:center;
    justify-contents:center;
    height:inherit;
    border-radius:${props=>props.BR?props.BR:""};
    & > p {
      line-height: ${props=>props.height?`calc(${props.height}/3)`:'calc(200px/3)'};
      display: inline-block;
      color:black;
      font-weight:900;
    }
  `
export default Drawer;