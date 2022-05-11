import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ItemGrid from '../components/store/ItemGrid';
import MypageTop from '../components/store/MypageTop';
import LocationBar from '../components/LocationBar';
import TabBar from '../components/TabBar';

const Mypage = (props) => {
    const {user_info, item_list, myScrabList} = useSelector(state => state.user);
   
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

export default Mypage;