import React from 'react';
import { useSelector } from 'react-redux';

import ItemGrid from '../components/store/ItemGrid';
import IconTabs from '../components/IconTabs';
import MypageTop from '../components/store/MypageTop';
import TitleBar from '../components/TitleBar';
import TouchSlide from '../components/TouchSlide';
import { Grid } from '../elements/index';

const Mypage = (props) => {
    const {user_info, item_list} = useSelector(state => state.user);

    return (
        <>
        <TitleBar title="마이페이지"/>
        <Grid
            padding="0 16px"
            position="relative"
        >
            <MypageTop user_info={user_info}/>
            <ItemGrid item_list={item_list}/>
            <TouchSlide title="찜한 상품"/>
            <TouchSlide title="나의 교환내역"/>
            <IconTabs />
        </Grid>
        </>
    );
};

export default Mypage;