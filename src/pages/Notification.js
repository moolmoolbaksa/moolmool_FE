import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import LocationBar from '../components/LocationBar';
import { api as notiActions, setNoti } from '../redux/modules/notification';
import { Grid } from '../elements/index';
import Noticard from '../components/Notification/Noticard';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const Notification = (props) => {
	const dispatch = useDispatch();
	const userId = useSelector(state => state.user.user_info.userId);
	const noti_list = useSelector(state => state.notification.noti_list);
	console.log(noti_list, userId)
	useEffect(() => {
		dispatch(notiActions.getNotiApi());
	}, []);

	const sock = new SockJS('http://13.124.0.71/ws-stomp');
    const client = Stomp.over(sock);

	useEffect(() => {
		client.connect({"Authorization": localStorage.getItem('token')}, () => {
			client.subscribe(`/sub/notification/${userId}`, (data) => {
				const response = JSON.parse(data.body);
				dispatch(setNoti(response.data));
				});
      		}
    	);

		return () => {
			client.disconnect();
		}
  	}, []);

    return (
		<Grid
			height="100%"
		>
			<LocationBar title="알림"/>
			<Container>
				{noti_list.map(v => {
					return 	<Noticard
								key={v.notificationId}
								{...v}
							/>
				})}
			</Container>
		</Grid>
    );
}

const Container = styled.div`
	padding: 0 16px;
	height: calc(100% - 60px);
	padding-bottom: 10px;
	overflow-y: scroll;
	-ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }

	& div:nth-child(1){
		border-top: 1.5px #c4c4c4 solid;
	}
	// 스크롤 주기
`;

// const NotiCard = styled.div`
// 	font-size: 18px;
// 	font-weight: bold;
// 	letter-spacing: -.67px;
// 	padding: 20px 0;
// 	border-bottom: 1px #c4c4c4 solid;
// 	color: ${props => props.isRead ? '#c4c4c4' : 'black'};
// `;

export default Notification;