import React from 'react';

import BagList from '../components/BagList';
import DetailBottom from '../components/detail/DetailBottom';
import MypageTop from '../components/mypage/MypageTop';
import { Grid } from '../elements/index';

const Mall = (props) => {
    return (
        <>   
            <Grid
                padding="0 16px"
                position="relative"
                height="100vh"
            >
                <MypageTop />
                <BagList />
            </Grid>
            <DetailBottom />
        </> 
    );
};

export default Mall;