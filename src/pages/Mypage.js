import React from 'react';

import BagList from '../components/BagList';
import IconTabs from '../components/IconTabs';
import MypageTop from '../components/mypage/MypageTop';
import TitleBar from '../components/TitleBar';
import TouchSlide from '../components/TouchSlide';

import { Grid } from '../elements/index';

const Mypage = (props) => {
    return (
        <>
        <TitleBar title="마이페이지"/>
        <Grid
            padding="0 16px"
            position="relative"
        >
            <MypageTop />
            <BagList />
            <TouchSlide title="찜한 상품"/>
            <TouchSlide title="나의 교환내역"/>
            <IconTabs />
        </Grid>
        </>
    );
};

export default Mypage;