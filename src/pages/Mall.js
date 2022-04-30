import React from 'react';

import DetailBottom from '../components/detail/DetailBottom';
// import MypageTop from '../components/mypage/MypageTop';
import { Grid } from '../elements/index';

const Mall = (props) => {
    return (
        <Grid height="100vh">   
            <Grid
                padding="0 16px"
                position="relative"
                
            >
                {/* <MypageTop /> */}
                {/* <BagList /> */}
            </Grid>
            <DetailBottom />
        </Grid> 
    );
};



export default Mall;