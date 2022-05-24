import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { Image, Grid, Text } from '../elements/index';
import Card from '../components/main/Card';
import TabBar from '../components/TabBar';
import LoginModal from '../components/modal/LoginModal';
import { ReactComponent as HambergerIcon } from '../images/햄버거.svg';
import { ReactComponent as NotiIcon } from '../images/종.svg';
import { ReactComponent as SearchIcon } from '../images/돋보기.svg';

import { ChatAPI } from '../shared/api';
import { setRoomlist } from '../redux/modules/chat';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { setUnreadNoti } from '../redux/modules/notification';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import HotDeal from '../components/main/HotDeal';
import { api as userActions } from '../redux/modules/user';
import { api as itemActions } from '../redux/modules/item';
import FetchMore from '../components/shared/FetchMore';
import SlideLeft from '../components/modal/SlideLeft';
const Main = props => {
    const dispatch = useDispatch();
    const is_token = localStorage.getItem('token');

    const userId = useSelector(state => state.user.user_info.userId);
    const { is_loading, paging, item_list } = useSelector(state => state.item);
    const { nickname, profile } = useSelector(state => state.user.user_info);
    const unread_noti = useSelector(state => state.notification.unread_noti);
    const [openCategory,setOpenCategory]=useState(false);
    const [filter, setfilter] = useState('전체');
    const [openFilter, setopenfilter] = useState(false);
 
    const sock = new SockJS(`${process.env.REACT_APP_SOCKET_URL}`);
    const client = Stomp.over(sock);

    useEffect(() => {
        if (is_token) dispatch(userActions.loginCheckApi());
    }, []);

    useEffect(() => {
        if (is_token) {
            client.connect({ Authorization: localStorage.getItem('token') }, () => {
                client.subscribe(
                    `/sub/notification/${userId}`,
                    data => {
                        console.log(data.body);
                        const unread_noti = JSON.parse(data.body);
                        dispatch(setUnreadNoti(unread_noti.NotificationCnt));
                    },
                    { Authorization: localStorage.getItem('token') },
                );
                client.send(`/pub/notification`, { Authorization: localStorage.getItem('token') }, {});
            });

            return () => {
                client.disconnect();
            };
        }
    }, [userId]);

    useEffect(() => {
        ChatAPI.getChatRoom()
            .then(res => {
                dispatch(setRoomlist(res.data));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const handleOpenCategory=()=>{
      console.log(openCategory);
      setOpenCategory(true);
    }
    const handleCloseCategory=()=>{
      console.log(openCategory);
      setOpenCategory(false);
    }
    const getNextList = (category, page) => {
        dispatch(itemActions.getItemApi({category: category, page: page}));
    };

    const scrollRef = useRef(null);

    useEffect(() => { 
        // 카테고리 변경 시 화면 맨 위로 올리기 위함
        if(scrollRef.current) scrollRef.current.scrollTop = 0;
        const category = filter === '전체' ? '' : `${filter}`;
        dispatch(itemActions.getItemApi({category, page: 0}));
    }, [filter]);

    

    return (
        <>
            <Grid height="100%" is_flex is_column>
                {/* 상단바 */}
                <Grid flex padding="10px 16px">
                    <HambergerIcon onClick={handleOpenCategory} />
                    <Grid flex gap="10px">
                        <SearchIcon width="24" height="24" onClick={() => {history.push('/search')}}/>
                        <NotiWrap>
                            <NotiIcon
                                onClick={() => {
                                    history.push('/noti');
                                }}
                            />
                            {unread_noti !== 0 && <NotiSign />}
                        </NotiWrap>
                    </Grid>
                </Grid>
                {/* 상단바끝 */}
                {/* 프로필 및 인사 */}
                <Grid is_flex align="center" padding="0px 16px 10px" gap="10px" borderB="1px #dadada solid">
                    <Image
                        size="50"
                        src={
                            profile
                                ? profile
                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSjj5IrkGRH6VDUgnUiMCjY2Npu5S8fDew1Q&usqp=CAU'
                        }
                    />
                    <Grid>
                        <Text text={`안녕하세요, ${nickname ? nickname : '방문자'}님`} letterSpacing="-1px" />
                        <Text
                            text="물물교환을 시작해 볼까요?"
                            bold="bold"
                            size="16px"
                            letterSpacing="-1px"
                            wordSpacing="-1px"
                        />
                    </Grid>
                </Grid>
                {/* 프로필 및 인사 끝 */}
                {openCategory&&<SlideLeft closeSlide={handleCloseCategory} setfilter={setfilter}/>}
            
                <CardWrap>
                    <HotDeal />
                    {item_list.slice().sort((a,b)=>b.itemId-a.itemId).map((p, idx) => {
                        return <Card key={p.itemId} {...p} />;
                    })}
                    <FetchMore paging={paging} callNext={() => getNextList(paging.category, paging.page)}/>
                </CardWrap>
                <TabBar position />
            </Grid>
            <LoginModal />
            
            {/* {is_loading && <Loading />} */}
        </>
    );
};

const BlinkSign = keyframes`
	0% {
		opacity: 0;
	}
	50%{
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
`;

const CardWrap = styled.div`
    padding: 0 16px;
    flex-grow: 1;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const NotiWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const NotiSign = styled.div`
    position: absolute;
    top: 4px;
    right: -1px;
    width: 7px;
    height: 7px;
    background-color: red;
    border-radius: 10px;
    animation: ${BlinkSign} 3s infinite ease-out;
`;

export default Main;
