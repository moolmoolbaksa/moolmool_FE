import React from 'react';
import { useSelector } from 'react-redux';

import MypageTop from '../components/store/MypageTop';
import ItemGrid from '../components/store/ItemGrid';
import { Grid } from '../elements/index';

const Mall = (props) => {
    const user_info = useSelector(state => state.user.other);
    const item_list = useSelector(state => state.user.other_item_list);

    return (
        <Grid height="100vh">   
            <Grid
                padding="0 16px"
                position="relative" 
            >
                <MypageTop user_info={user_info}/>
                <ItemGrid item_list={item_list}/>
            </Grid>
            {/* <DetailBottom /> */}
        </Grid> 
    );
};



export default Mall;