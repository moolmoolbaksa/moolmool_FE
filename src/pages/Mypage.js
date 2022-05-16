import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import ItemGrid from '../components/store/ItemGrid';
import MypageTop from '../components/store/MypageTop';
import LocationBar from '../components/LocationBar';
import TabBar from '../components/TabBar';
import { history } from '../redux/configureStore';
import { api as userActions } from '../redux/modules/user';

const Mypage = (props) => {
    const dispatch = useDispatch();
    const {user_info, item_list, myScrabList} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(userActions.getMyInfoApi());
    }, []);
    
    return (
        <>
            <LocationBar title="마이페이지"/>
            <Container
                padding="0 16px"
                position="relative"
            >
                <MypageTop user_info={user_info}/>
                <ItemGrid item_list={item_list}/>
                <ItemGrid item_list={myScrabList} type="scrab"/>
                <MenuTab onClick={() => {history.push('/trhistory')}}>
                    나의 교환 내역
                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
                </MenuTab>
            </Container>
            <TabBar/>
        </>
    );
};

const Container = styled.div`
    padding: 0 16px;
    position: relative;
    height: calc(100vh - 120px);
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }
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

export default Mypage;