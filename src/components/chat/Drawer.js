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


const Drawer = (props) => {
  console.log(props);
  console.log(props.onclose);
  console.log(props.roomid);
  const test=()=>{
    console.log('button test');
  }
  const exitroom=()=>{
		ChatAPI.exitRoom(props.roomid)
			.then((res)=>{
				console.log(res);
			})
			.catch((err)=>{
				console.log(err);
			})
	};

  return(
    <ModalBackground onClick={props.onclose}>
    {/* <ModalBackground > */}
      <Modalcontents>
        <Buttonwrap>
        <button style={{width:'420px'}} onClick={(e)=>{e.stopPropagation();test();exitroom();}}>채팅방 나가기</button>
        <button style={{width:'420px'}} onClick={(e)=>{e.stopPropagation();test();}}>신고하기</button>
        <button style={{width:'420px'}} onClick={(e)=>{e.stopPropagation();test();}}>차단하기</button>
        <button style={{width:'420px'}} onClick={(e)=>{e.stopPropagation();props.onclose()}}>취소</button>

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
  height: 150px;
  border-radius: 10px 10px 0 0;
  background: white;
  bottom: -50px;
  
  transform: translateY(-50px);
  animation: ${boxFade} 0.2s linear alternate;
  z-index:10001;
  `;
  const Buttonwrap=styled.div`
  height:inherit;
  margin:10px 0px;
  background:yellow;
  z-index:10002;
  `
export default Drawer;