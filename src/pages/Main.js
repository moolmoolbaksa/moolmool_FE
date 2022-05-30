import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Image, Grid, Text } from '../elements/index';
import MainCard from '../components/main/MainCard';
import TabBar from '../components/TabBar';
import LoginModal from '../components/modal/LoginModal';
import { ReactComponent as NotiIcon } from '../images/종.svg';
import { ReactComponent as SearchIcon } from '../images/돋보기.svg';

import { ChatAPI } from '../shared/api';
import { setRoomlist } from '../redux/modules/chat';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { setUnreadNoti } from '../redux/modules/notification';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import HotDeal from '../components/main/HotDeal';
import { api as userActions } from '../redux/modules/user';
import { api as itemActions } from '../redux/modules/item';
import FetchMore from '../components/shared/FetchMore';
import CategoryBar from '../components/main/CategoryBar';
import MainContentSkeleton from '../components/skeleton/MainContentSkeleton';
import defaultProfile from '../images/default_profile.png';
import useScrollMove from '../hooks/useScrollMove';
import { useHistory } from 'react-router-dom';

const Main = props => {
    const dispatch = useDispatch();
    const is_token = localStorage.getItem('token');
    
    const userId = useSelector(state => state.user.user_info.userId);
    const { paging, item_list } = useSelector(state => state.item);
    const { nickname, profile } = useSelector(state => state.user.user_info);
    const unread_noti = useSelector(state => state.notification.unread_noti);
    const [filter, setfilter] = useState('전체');
 
    const sock = new SockJS(`${process.env.REACT_APP_SOCKET_URL}`);
    const client = Stomp.over(sock);
    
    useEffect(() => {
        if (is_token) dispatch(userActions.loginCheckApi());
    }, []);

    useEffect(() => {
        if (userId && is_token) 
        {
          console.log('connected check');
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
        }

        return() => {
            if(is_token && client.ws.readyState === 1)
            {
            client.disconnect(() => {
                                        client.unsubscribe('sub-0');
                                    },
                { Authorization: `${localStorage.getItem('token')}` },
            );
            }
        };   
    }, [userId]);
    console.log(userId.length);
    useEffect(() => {
      if(is_token){ChatAPI.getChatRoom()
            .then(res => {
              console.log(res);
                dispatch(setRoomlist(res.data));
            })
            .catch(error => {
                console.log(error);
            });}
    }, []);

    // 무한스크롤: 호출돼야할 함수 세팅
    const getNextList = (category, page) => {
        dispatch(itemActions.getItemApi({category: category, page: page}));
    };

    const scrollRef = useRef();
    const categoryRef = useRef();
    useEffect(() => { 
        // 카테고리 변경 시 화면 맨 위로 올리기 위함
    
        if(scrollRef?.current) {
            // 왜 아래는 안되는거지?
            // let scroll = scrollRef.current.scrollTop;
            // scroll <= 415 ? scroll = 0 : scroll = 415;
            if(scrollRef.current.scrollTop < 415){
                scrollRef.current.scrollTop = 0;
            } else {
                scrollRef.current.scrollTop = 415;
            }
        }
        const category = filter === '전체' ? '' : `${filter}`;
        dispatch(itemActions.getItemApi({category, page: 0}));
    }, [filter]);
    
    // const {scrollInfo, scrollRemove} = useScrollMove({path: `/`, dom: scrollRef.current});
    // useEffect(() => {
    //     return () => {
    //         console.log('실행')
    //         sessionStorage.setItem('scroll', scrollRef.current.scrollTop); 
    //     }
    // }, [scrollRef]);
    
    return (
        <>
            <Container>
                {/* 상단바 */}
                <Grid flex padding="10px 16px" justify="flex-end">
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
                    {/* 프로필 및 인사 끝 */}
                    <HotDeal />
                    <CategoryBar setfilter={setfilter} ref={categoryRef}/>
                    <MainItemWrap>
                        {item_list 
                            ?   item_list.map((v, _) => {
                                    return <MainCard key={v.itemId} {...v} />
                                })
                            :   <MainContentSkeleton />
                        }
                    </MainItemWrap>
                    <FetchMore paging={paging} callNext={() => getNextList(paging.category, paging.page)}/>
                </ScrollWrap>
                <TabBar position />
            </Container>
            <LoginModal />
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

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
`;

const ScrollWrap = styled.div`
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

const MainItemWrap = styled.div`
    padding: 0 16px;
`;

export default Main;
