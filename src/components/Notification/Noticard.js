import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

import { api as notiActions } from "../../redux/modules/notification";

const Noticard = ({notificationId, isRead, type, nickname, changeId}) => {    
    const dispatch = useDispatch();

	const onNotiClick = () => {
		console.log(notificationId, changeId)
		switch(type){
			case 'BARTER':
				dispatch(notiActions.getBarterNotiApi({notificationId, changeId}));
				break;
			case 'CHAT':
				history.push('/chat');
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
	padding: 20px 10px;
	color: ${props => props.isRead ? '#c4c4c4' : 'black'};
	border-radius: 10px;
    background-color: white;
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.2);
`;

export default Noticard;