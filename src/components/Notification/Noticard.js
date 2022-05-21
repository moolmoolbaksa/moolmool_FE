import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
import { enterRoom } from "../../redux/modules/chat";
import { api as notiActions } from "../../redux/modules/notification";
import timeForToday from "../../shared/timeForToday";
const Noticard = ({notificationId, isRead, type, nickname, changeId, date, userId, profile}) => {    
    const dispatch = useDispatch();

	const onNotiClick = () => {
		switch(type){
			case 'BARTER':
				dispatch(notiActions.getBarterNotiApi({notificationId, changeId}));
				break;
			case 'CHAT':
				dispatch(enterRoom({changeId, nickname, userId, profile}));
				dispatch(notiActions.getChatNotiApi({notificationId, changeId}));
				break;
			case 'ETC':
				break;
			default:
				history.push('/trhistory');
				break;
		};
	};
	
	return (
		<Container 
			onClick={onNotiClick}			
		>
			<TypeColor type={type}/>
			{type === 'CHAT' && <span>{nickname}님에게서 <span className="emp">채팅</span>이 왔어요.</span>}
			{type === 'BARTER' && <span>{nickname}님에게서 <span className="emp">교환 신청</span>이 왔어요.</span>}
			{type === 'SCORE' && <span>{nickname}님과의 거래를 <span className="emp">평가</span>해주세요.</span>}
			{type === 'FINISH' && <span>회원님! {nickname}님과의 거래를 <span className="emp">확정</span>해주세요.</span>}
			{type === 'ETC' && <span><b>반가워요 {nickname}님! 회원가입을 축하드려요.</b></span>}
			<Time>{timeForToday(date)}</Time>
		</Container>
    );
};

const Container = styled.div`
	position: relative;
	display: flex;
	padding: 20px 15px;
    background-color: ${props => props.isRead ? '#F9F9F9' : 'white'};
	border-top: 1px #f9f9f9 solid;
	border-bottom: 1px #f9f9f9 solid;
	cursor: pointer;

	span {
		flex-grow: 1;
		font-size: 15px;
		letter-spacing: -.67px;
		color: ${props => props.isRead ? '#c4c4c4' : 'black'};
	};

	span.emp {
		font-size: 16px;
		font-weight: bold;
	};
`;

const TypeColor = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 8px;
	height: 100%;
	${props => {
		switch(props.type){
			case 'CHAT':
				return 'background-color: #99D2F2;'
			case 'BARTER':
				return 'background-color: #FE7B7B;'
			case 'FINISH':
				return 'background-color: #ADADAD;'
			case 'SCORE':
				return 'background-color: #9B99F2;'
			default:
				return 'background-color: #FFD467;'
		}
	}};
`;

const Time = styled.div`
	color: #9d9d9d;
	font-size: 11px;
`;

export default Noticard;