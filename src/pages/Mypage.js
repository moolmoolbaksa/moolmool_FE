import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { api as userActions } from '../redux/modules/user';
import { Link, useRouteMatch } from 'react-router-dom';
import { persistor } from '../index';

import ItemGrid from '../components/store/ItemGrid';
import MypageTop from '../components/store/MypageTop';
import LocationBar from '../components/LocationBar';
import TabBar from '../components/TabBar';
import { Grid } from '../elements/index';
import { ReactComponent as ArrowIcon } from '../images/arrow.svg';

const Mypage = (props) => {
    const dispatch = useDispatch();
    const {user_info, item_list, myScrabList} = useSelector(state => state.user);
    const is_login = useSelector(state => state.user.is_login);
    
    useEffect(() => {
        dispatch(userActions.getMyInfoApi());
    }, []);

    const Logout = () => {
        // 로그아웃 시 스토리지를 비웁니다.
        localStorage.clear();
        sessionStorage.clear();
        persistor.purge();
    };
    
    return (
        <Grid height="100%" is_column>
            <LocationBar title="마이페이지"/>
            <Container>
                <MypageTop user_info={user_info}/>
                <ItemGrid item_list={item_list}/>
                <ItemGrid item_list={myScrabList} type="scrab"/>
                <MenuTab 
                    onClick={() => {history.push('/banlist')}}
                >
                    차단 목록
                    <StyledArrowIcon width="22" height="22"/>
                </MenuTab>
                {is_login && <StyledLink to="/" onClick={Logout}>로그아웃</StyledLink>}
            </Container>
            <TabBar position/>
        </Grid>
    );
};

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    padding: 0 16px 20px;
    position: relative;
    flex-grow: 1;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none; 
    };
`;

const MenuTab = styled.div`
    border-top: 1px #c4c4c4 solid;
    border-bottom: 1px #c4c4c4 solid;
    padding: 10px 0 10px 5px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:active {
        background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
    };
`;

const StyledLink = styled(Link)`
    margin: auto 0 0 auto;
    width: max-content;
    text-decoration: none;
    font-size: 13px;
    line-height: 12.5px;
    font-weight: bold;
    color: black;
    letter-spacing: -1px;
    border-bottom: 1px #9d9d9d solid;
    cursor: pointer;
`;

const StyledArrowIcon = styled(ArrowIcon)`
    transform: rotate(180deg);
`;

export default Mypage;