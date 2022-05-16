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
	const is_token = localStorage.getItem("token");

	useEffect(() => {
		if(is_token){
			dispatch(notiActions.getNotiApi());
		};
	}, []);

	const sock = new SockJS('https://langho968.shop/wss-stomp');
    const client = Stomp.over(sock);

	useEffect(() => {
		if(is_token){
			client.connect({"Authorization": localStorage.getItem('token')}, () => {
				client.subscribe(`/sub/notification/${userId}`, (data) => {
					const response = JSON.parse(data.body);
					console.log(response);
					dispatch(setNoti(response));
					}, {"Authorization": localStorage.getItem('token')});
				}
			);
			return () => {
				client.disconnect();
			};
		};
  	}, []);

    return (
		<Grid
			height="100%"
		>
			<LocationBar title="알림"/>
			<Container>
				{is_token && noti_list.map(v => {
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
	display: flex;
	flex-flow: column nowrap;
	gap: 10px;
	padding: 16px 16px 0;
	height: calc(100% - 60px);
	padding-bottom: 10px;
	background-color: #f5f5f5;
	overflow-y: scroll;
	-ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }
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