import React from 'react';
import styled from 'styled-components';

import { ReactComponent as HomeIcon } from "../images/홈.svg";
import { ReactComponent as HomeIconYellow } from "../images/홈(노랑).svg";
import { ReactComponent as ChatIcon } from "../images/채팅.svg";
import { ReactComponent as ChatIconYellow } from "../images/채팅(노랑).svg";
import { ReactComponent as MyIcon } from "../images/마이페이지.svg";
import { ReactComponent as MyIconYellow } from "../images/마이페이지(노랑).svg";
import { ReactComponent as PlusIcon } from "../images/플러스.svg";
import { ReactComponent as TradeIcon } from "../images/trade_history.svg";
import { Text } from '../elements/index';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { setLoginModal } from '../redux/modules/modal';
import { useLocation } from 'react-router-dom';
import AlertModal from '../components/modal/AlertModal';

const TabBar = ({position}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const is_login = useSelector(state => state.user.is_login);

    const goMypage = () => {
        if(!is_login) return dispatch(setLoginModal(true));
        history.push('/mypage');
        window.scrollTo(0, 0);
    };

    const goHistory = () => {
        if(!is_login) return dispatch(setLoginModal(true));
        history.push('/trhistory');
        window.scrollTo(0, 0);
    };

    const goRegipage =()=>{
        if(!is_login) return dispatch(setLoginModal(true));
        history.push('/registerproduct');
        window.scrollTo(0, 0);
    };

    const goHome =()=>{
        if(!is_login) return dispatch(setLoginModal(true));
        history.push('/');
        window.scrollTo(0, 0);
    };
    
    const goChat =()=>{
        if(!is_login) return dispatch(setLoginModal(true));
        history.push('/chat');
        window.scrollTo(0, 0);
    };

    return (
        <>
        <Container position={position}>
            <Wrap onClick={goHome}>
                {location.pathname === '/'
                    ? <HomeIconYellow/>
                    : <HomeIcon/>
                }
                <Text 
                    text="홈"
                    textAlign="center"
                    size="12px"
                    color={location.pathname === '/' ? '#FFD467' : 'black'}
                />
            </Wrap>
            <Wrap onClick={goHistory}>
                {location.pathname === '/trhistory'
                    ? <TradeIcon fill="#FFD467"/>
                    : <TradeIcon />
                }
                <Text 
                    text="교환내역"
                    textAlign="center"
                    size="12px"
                    color={location.pathname === '/trhistory' ? '#FFD467' : 'black'}
                />
            </Wrap>
            <Wrap>
                <CreateBtn onClick={goRegipage}>
                    <PlusIcon />
                </CreateBtn>
                <Text 
                    text="물품등록"
                    textAlign="center"
                    size="12px"
                />
            </Wrap>
            <Wrap onClick={goChat}>
                {location.pathname === '/chat'
                    ? <ChatIconYellow/>
                    : <ChatIcon/>
                }
                <Text
                    text="채팅"
                    textAlign="center"
                    size="12px"
                    color={location.pathname === '/chat' ? '#FFD467' : 'black'}
                />
            </Wrap>
            <Wrap onClick={goMypage} color={location.pathname === '/mypage' ? '#FFD467' : 'black'}>
                {location.pathname === '/mypage'
                    ? <MyIconYellow/>
                    : <MyIcon/>
                }
                <span>마이페이지</span>
            </Wrap>
        </Container>
        <AlertModal type="soon"/>
        </>
    );
};

const Container = styled.div`
    ${props => 
        !props.position 
            ?   `   position: absolute;
                    bottom: 0;
                `
            :   ''
    };
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 16px;
    background: #fbfbfb;
`;

const Wrap = styled.div`
    position: relative;
    display: flex;
    height: 100%;
    width: 50px;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    & span {
        text-align: center;
        font-size: 12px;
        white-space: nowrap;
        color: ${props => props.color};
    }
`;

const CreateBtn = styled.button`
    position: absolute;
    bottom: 20px;
    width: 50px;
    height: 50px;
    background: ${props => props.theme.palette.yellow};
    border: none;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 1px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    & span {
        text-indent: -9999;
        font-size: 35px;
        color: black;
        font-weight: bold;
    }
    cursor: pointer;
`;

export default TabBar;