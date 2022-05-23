import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import ItemGrid from '../components/store/ItemGrid';
import MypageTop from '../components/store/MypageTop';
import LocationBar from '../components/LocationBar';
import TabBar from '../components/TabBar';
import { history } from '../redux/configureStore';
import { api as userActions } from '../redux/modules/user';
import { Link } from 'react-router-dom';
import { Grid } from '../elements/index';
import { persistor } from '../index';

const Mypage = (props) => {
    const dispatch = useDispatch();
    const {user_info, item_list, myScrabList} = useSelector(state => state.user);
    const is_login = useSelector(state => state.user.is_login);
    
    useEffect(() => {
        dispatch(userActions.getMyInfoApi());
    }, []);

    const Logout = () => {
        localStorage.clear();
        persistor.purge();
    };
   
    return (
        <Grid height="100%" is_flex is_column>
            <LocationBar title="마이페이지"/>
            <Container
                padding="0 16px"
                position="relative"
            >
                <MypageTop user_info={user_info}/>
                <ItemGrid item_list={item_list}/>
                <ItemGrid item_list={myScrabList} type="scrab"/>
                <MenuTab 
                    onClick={() => {history.push('/banlist')}}
                >
                    차단 목록
                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
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

    & span {
        font-size: 25px;
    };
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

export default Mypage;