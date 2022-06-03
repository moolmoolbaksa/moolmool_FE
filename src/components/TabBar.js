import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { useLocation } from 'react-router-dom';

import { ReactComponent as HomeIcon } from "../images/home.svg";
import { ReactComponent as TradeIcon } from "../images/barter.svg";
import { ReactComponent as ChatIcon } from "../images/chat.svg";
import { ReactComponent as MyIcon } from "../images/myPage.svg";
import { ReactComponent as PlusIcon } from "../images/plus.svg";
import { setLoginModal } from '../redux/modules/modal';

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
        history.push('/');
        window.scrollTo(0, 0);
    };
    
    const goChat =()=>{
        if(!is_login) return dispatch(setLoginModal(true));
        history.push('/chat');
        window.scrollTo(0, 0);
    };

    return (
        <Container position={position}>
            <Wrap onClick={goHome}>
                {location.pathname === '/'
                    ? <HomeIcon fill="#0095b7" stroke="#0095b7"/>
                    : <HomeIcon fill="#000" stroke="#000"/>
                }
            </Wrap>
            <Wrap onClick={goHistory}>
                {location.pathname === '/trhistory'
                    ? <TradeIcon fill="#0095b7"/>
                    : <TradeIcon fill="#1C1C1E"/>
                }
            </Wrap>
            <Wrap>
                <CreateBtn onClick={goRegipage} aria-label="물품등록 버튼">
                    <PlusIcon stroke="white"/>
                </CreateBtn>
            </Wrap>
            <Wrap onClick={goChat}>
                {location.pathname === '/chat'
                    ? <ChatIcon fill="#0095b7" stroke="#0095b7"/>
                    : <ChatIcon fill="#1C1C1E" storke="#1C1C1E"/>
                }
            </Wrap>
            <Wrap onClick={goMypage}>
                {location.pathname === '/mypage'
                    ? <MyIcon fill="#0095b7"/>
                    : <MyIcon fill="#1C1C1E"/>
                }
            </Wrap>
        </Container>
    );
};
const rotate = keyframes`
    0% { 
        transform: rotate(0deg);   
    }
    100% { 
        transform: rotate(360deg); 
    }
`;

const Container = styled.div`
    width: 100%;
    min-height: 60px;
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
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
`;

const CreateBtn = styled.button`
    position: absolute;
    z-index: 10000;
    bottom: 15px;
    width: 55px;
    height: 55px;
    background-color: ${props => props.theme.palette.yellow};
    border: none;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        bottom: 0;
        width: 100%;
        border-radius: 50px;
        animation: ${rotate} 4s infinite linear;
        background: linear-gradient(transparent 50%, rgba(255, 238, 194, 0.8));
    }
`;

export default TabBar;