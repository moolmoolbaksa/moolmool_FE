import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ItemGrid from '../components/store/ItemGrid';
import IconTabs from '../components/IconTabs';
import MypageTop from '../components/store/MypageTop';
import TouchSlide from '../components/TouchSlide';
import { Grid } from '../elements/index';
import DetailBottom from '../components/detail/DetailBottom';
import LocationBar from '../components/LocationBar';

const Mypage = (props) => {
    const {user_info, item_list} = useSelector(state => state.user);

    return (
        <>
        <LocationBar title="마이페이지"/>
        <Grid
            padding="0 16px"
            position="relative"
        >
            <MypageTop user_info={user_info}/>
            <Wrap
            
            >
                <ItemGrid item_list={item_list}/>
                <TouchSlide title="찜한 상품"/>
                <TouchSlide title="나의 교환내역"/>
            </Wrap>
            {/* <IconTabs /> */}
        </Grid>
        <DetailBottom />
        </>
    );
};

const Wrap = styled.div`
    width: 100%;
    height: calc(100vh - 325px);
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }
`;

export default Mypage;