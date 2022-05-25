import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import LocationBar from '../components/LocationBar';
import { api as notiActions, setNoti } from '../redux/modules/notification';
import { Grid } from '../elements/index';
import Noticard from '../components/notification/Noticard';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { ReactComponent as EmptyIcon } from '../images/outline_error_outline_black_48pt_2x 1.svg';

const Notification = props => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.user_info.userId);
    const noti_list = useSelector(state => state.notification.noti_list);
    const is_token = localStorage.getItem('token');

    useEffect(() => {
        if (is_token) {
            dispatch(notiActions.getNotiApi());
        }
    }, []);
   
	const sock = new SockJS(`${process.env.REACT_APP_SOCKET_URL}`);
    const client = Stomp.over(sock);

    useEffect(() => {
        if (is_token) {
            client.connect({ Authorization: localStorage.getItem('token') }, () => {
                client.subscribe(
                    `/sub/notification/${userId}`,
                    data => {
                        const response = JSON.parse(data.body);
                        console.log(response);
                        dispatch(setNoti(response));
                    },
                    { Authorization: localStorage.getItem('token') },
                );
            });
            return () => {
                client.disconnect();
            };
        }
    }, []);

    return (
        <Grid height="100%" is_flex is_column>
            <LocationBar title="알림" />
            <Container>
                {noti_list.length
                    ?   noti_list.map(v => {
                        return <Noticard key={v.notificationId} {...v} />;})
                        // 빈화면은 컴포넌트로 빼서 정리하기ㅜㅜ
                    :   <Wrap>
                            <EmptyIcon />
                            <Text>알림창이 비어있습니다.</Text> 
                        </Wrap>
                }
            </Container>
        </Grid>
    );
};

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    padding-bottom: 10px;
    background-color: #f5f5f5;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Wrap = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
    span {
        font-size: 100px;
        text-align: center;
        text-indent: -9999;
    };
`;

const Text = styled.div`
    font-size: 18px;
    color: #9d9d9d;
    word-spacing: -2px;
    letter-spacing: -1px;
    text-align: center;
`;

export default Notification;
