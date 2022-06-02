import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ChatAPI } from '../../shared/api';
import { history } from '../../redux/configureStore';
import { useDispatch } from 'react-redux';
import { setReportModal } from '../../redux/modules/modal';

import {setAlertModal} from '../../redux/modules/modal';

const Drawer = (props) => {
  const dispatch = useDispatch();

  const ban=()=>{
    ChatAPI.banUser(props.userId)
    .then((res)=>{
      console.log(res);
      history.replace('/chat');
    })
    .catch((error)=>{
      dispatch(setAlertModal(true))
      console.log('modal check');
      setTimeout(()=>{props.onclose();},100);
      
      console.log(error.response.headers);
      
    })
  };

  const exitroom=()=>{
		ChatAPI.exitRoom(props.roomid)
			.then((res)=>{
				console.log(res);
        history.replace('/chat');
			})
			.catch((err)=>{
				console.log(err);
			})
	};

  const report_arr = ['영리목적/광고', '욕설/인신공격', '음란성/선정성', '같은내용 반복개시', '개인정보노출', '저작권침해'];
  
  const onReportItem = (e) => {
    props.onclose();
    dispatch(setReportModal({
      is_report_modal: true,
      content: e.target.innerHTML,
      itemId: props.itemId,
    }));
  };

  if(props.location === 'detail'){
    return (
      <ModalBackground onClick={props.onclose}>
        <Modalcontents>
          <Buttonwrap>
            {report_arr.map((v, i) => {
              return <Button key={i} onClick={onReportItem}>{v}</Button>
            })}
            <Button onClick={(e)=>{e.stopPropagation(); props.onclose()}}>취소</Button>
          </Buttonwrap>
        </Modalcontents>
      </ModalBackground>
    );
  };

  return(
    <>
    <ModalBackground onClick={props.onclose}>
      <Modalcontents>
        <Buttonwrap>
          <Button onClick={(e)=>{e.stopPropagation(); exitroom();}}>채팅방 나가기</Button>
          <Button onClick={(e)=>{e.stopPropagation(); ban();  props.onclose();}}>차단하기</Button>
          <Button onClick={(e)=>{e.stopPropagation(); props.onclose()}}>취소</Button>
        </Buttonwrap>
      </Modalcontents>
    </ModalBackground>
    </>
  );
};

// 애니메이션 폴더로 관리하기!
const boxFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const ModalBackground = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Modalcontents = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 20px 20px 0 0;
  animation: ${boxFade} .2s linear alternate;
`;

const Buttonwrap = styled.div`
  display: flex;
  flex-flow: column;
  height: inherit;
  background: white;
  border-radius: 20px 20px 0 0;
 
  button:nth-of-type(1){
    border-radius: 20px 20px 0 0;
  };
  button:nth-last-of-type(2){
    border: none;
  };
  button:nth-last-of-type(n+2):hover{
    background-color: rgba(236, 236, 236, 1);
    font-weight: bold;
  };
  button:nth-last-of-type(1){
    background-color: ${props => props.theme.palette.yellow};
    font-weight: bold;
  };
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: white;
  border-bottom: 2px solid #E8E8E8;
  padding: 20px 0;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
`;

export default Drawer;