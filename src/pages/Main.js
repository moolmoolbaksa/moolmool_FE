import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ChatAPI } from '../shared/api';
import { setRoomlist } from '../redux/modules/chat';
import { setUnreadNoti } from '../redux/modules/notification';
import { useDispatch, useSelector } from 'react-redux';
import { api as userActions } from '../redux/modules/user';
import { api as itemActions } from '../redux/modules/item';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import { Image, Grid, Text } from '../elements/index';
import MainCard from '../components/main/MainCard';
import TabBar from '../components/TabBar';
import LoginModal from '../components/modal/LoginModal';
import HotDeal from '../components/main/HotDeal';
import FetchMore from '../components/shared/FetchMore';
import CategoryBar from '../components/main/CategoryBar';
import MainContentSkeleton from '../components/skeleton/MainContentSkeleton';
import defaultProfile from '../images/default_profile.png';
import useScrollRestoration from '../hooks/useScrollRestoration';
import MainHeader from '../components/main/MainHeader';
import {setConnect} from '../redux/modules/chat';

const Main = props => {
    const dispatch = useDispatch();
    const is_token = localStorage.getItem('accessToken');

    const userId = useSelector(state => state.user.user_info.userId);
    const { paging, item_list } = useSelector(state => state.item);
    const { nickname, profile } = useSelector(state => state.user.user_info);
    const [filter, setfilter] = useState(paging.category);
    // const websocket_temp=useSelector(state=>state.chat.connected);

    // if(!websocket_temp)
    // {
    //   var sock = new SockJS(`${process.env.REACT_APP_SOCKET_URL}`);
    //   var client = Stomp.over(sock);
    //   dispatch(setConnect(true));
    // }

    let sock = new SockJS(`${process.env.REACT_APP_SOCKET_URL}`);
    let client = Stomp.over(sock);
  
    useEffect(() => {
        if (is_token) dispatch(userActions.loginCheckApi());
    }, [is_token]);
    
    useEffect(() => {
      
        if (userId && is_token) 
        {
          console.log('connected check');
            client.connect({ Authorization: localStorage.getItem('accessToken') }, () => {
                client.subscribe(
                    `/sub/notification/${userId}`,
                    (data) => {
                        console.log(data.body);
                        const unread_noti = JSON.parse(data.body);
                        dispatch(setUnreadNoti(unread_noti.NotificationCnt));
                    },
                    { Authorization: localStorage.getItem('accessToken') },
                );
                client.send(`/pub/notification`, { Authorization: localStorage.getItem('accessToken') }, {});
            });
        }

        return() => {
            if(is_token && client.ws.readyState === 1)
            {
            client.disconnect(() => {
                                        client.unsubscribe('sub-0');
                                    },
                { Authorization: `${localStorage.getItem('accessToken')}` },
            );
            dispatch(setConnect(false));
            }
        };   
    }, [userId]);
   
    useEffect(() => {
        if(is_token){
            ChatAPI.getChatRoom()
                .then(res => {
                    console.log(res);
                    dispatch(setRoomlist(res.data));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);

    const scrollRef = useRef(null);
    const categoryRef = useRef();
    const {scrollInfo} = useScrollRestoration({dom: scrollRef.current});
    
    useEffect(() => { 
        if(paging.is_first){
            // 최초 아이템 호출
            dispatch(itemActions.getItemApi({category: '', page: 0}));
        } else {
            // 카테고리가 변경되었을 경우
            if(paging.category !== filter){
                // 스크롤 이동
                if(scrollRef.current) {
                    if(scrollRef.current.scrollTop < 415){
                        scrollRef.current.scrollTop = 0;
                    } else {
                        scrollRef.current.scrollTop = 415;
                    }
                }
                // 변경된 카테고리 아이템 호출
                dispatch(itemActions.getItemApi({category: filter, page: 0}));
            } else {
                // 이전 스크롤 위치 복원
                scrollRef.current.scrollTo(0, scrollInfo);
            }
        }
    }, [filter]);

    // 무한스크롤: 다음 호출 함수 세팅
    const getNextList = (category, page) => {
        dispatch(itemActions.getItemApi({category: category, page: page}));
    };

    return (
        <>
            <Container>
                <MainHeader dom={scrollRef.current}/>
                <ScrollWrap ref={scrollRef}>
                    <Grid is_flex align="center" padding="0px 16px 10px" gap="7px" borderB="1px #e8e8e8 solid">
                        <Image
                            size="50"
                            src={
                                profile
                                    ? profile
                                    : defaultProfile
                            }
                        />
                        <Grid grow>
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
                    <HotDeal />
                    <CategoryBar setfilter={setfilter} ref={categoryRef}/>
                    <MainItemWrap>
                        {item_list 
                            ?   item_list.map((v, _) => {
                                    return <MainCard key={v.itemId} {...v}/>
                                })
                            :   <MainContentSkeleton />
                        }
                    </MainItemWrap>
                    <FetchMore paging={paging} callNext={() => getNextList(paging.category, paging.page)}/>
                </ScrollWrap>
                <TabBar />
            </Container>
            <LoginModal />
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    position: relative;
`;

const ScrollWrap = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const MainItemWrap = styled.div`
    padding: 0 16px;
`;

export default Main;
