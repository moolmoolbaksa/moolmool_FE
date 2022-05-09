import React from 'react';
import styled from 'styled-components';

import { ReactComponent as HomeIcon } from "../images/홈.svg";
import { ReactComponent as SearchIcon } from "../images/돋보기.svg";
import { ReactComponent as ChatIcon } from "../images/채팅.svg";
import { ReactComponent as MyIcon } from "../images/마이페이지.svg";
import { Text } from '../elements/index';
import { useDispatch, useSelector } from 'react-redux';
import { api as userApi } from '../redux/modules/user';
import { history } from '../redux/configureStore';
import { setLoginModal } from '../redux/modules/modal';

const TabBar = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector(state => state.user.is_login);

    const goMypage = () => {
        if(!is_login) return dispatch(setLoginModal(true));
        dispatch(userApi.getMyInfoApi());
        history.push('/mypage');
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

    return (
        <Container>
            <Wrap onClick={goHome}>
                <HomeIcon width="36" height="36"/>
                <Text 
                    text="홈"
                    textAlign="center"
                    size="12px"
                />
            </Wrap>
            <Wrap>
                <SearchIcon width="33" height="33"/>
                <Text 
                    text="무료나눔"
                    textAlign="center"
                    size="12px"
                />
            </Wrap>
            <CreateBtn onClick={goRegipage}>
                <span className="material-symbols-outlined">
                    add
                </span>
            </CreateBtn>
            <Wrap>
                <ChatIcon width="36" height="36"/>
                <Text 
                    text="채팅"
                    textAlign="center"
                    size="12px"
                />
            </Wrap>
            <Wrap onClick={goMypage}>
                <MyIcon width="36" height="36"/>
                <span>마이페이지</span>
            </Wrap>
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 16px;
    background: white;
`;

const Wrap = styled.div`
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
    }
`;

const CreateBtn = styled.button`
    width: 50px;
    height: 50px;
    background: #ffca39;
    border: none;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 1px;
    & span {
        text-indent: -9999;
        font-size: 30px;
        color: white;
    }
    cursor: pointer;
`;

export default TabBar;