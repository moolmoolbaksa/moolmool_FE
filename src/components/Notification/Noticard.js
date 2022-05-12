import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { api as notiActions } from "../../redux/modules/notification";

const Noticard = ({notificationId, isRead, type, nickname, changeId}) => {    
    const dispatch = useDispatch();

	const onNotiClick = () => {
		switch(type){
			case 'BARTER':
				dispatch(notiActions.getBarterNotiApi({notificationId, changeId}));
				break;
			default:
				//chat
				dispatch(notiActions.getBarterNotiApi({notificationId, changeId}));
		};
	};
	
	return (
		<Container 
			isRead={isRead}
			onClick={onNotiClick}
		>
			{type === 'CHAT' && `${nickname}님에게서 채팅이 왔어요!`}
			{type === 'BARTER' && `${nickname}님에게서 교환 신청이 왔어요!`}
			{type === 'ETC' && `반가워요! ${nickname}님의 회원가입을 축하드려요`}
			{type === 'SCORE' && `기타등등`}
		</Container>
    );
}

const Container = styled.div`
	font-size: 16px;
	font-weight: bold;
	letter-spacing: -.67px;
	padding: 20px 0;
	border-bottom: 1px #c4c4c4 solid;
	color: ${props => props.isRead ? '#c4c4c4' : 'black'};
`;

export default Noticard;