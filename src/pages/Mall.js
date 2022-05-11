import React from 'react';
import { useSelector } from 'react-redux';

import MypageTop from '../components/store/MypageTop';
import ItemGrid from '../components/store/ItemGrid';
import { Grid } from '../elements/index';
import TabBar from '../components/TabBar';
import LocationBar from '../components/LocationBar';

const Mall = (props) => {
    const {other_item_list, ...other_info} = useSelector(state => state.user.other);
    
    return (
        <Grid>
            <LocationBar title={`${other_info.nickname}님의 보따리`}/>   
            <Grid
                padding="0 16px"
                position="relative" 
            >
                <MypageTop user_info={other_info}/>
                <ItemGrid item_list={other_item_list} type="mall"/>
            </Grid>
            <TabBar />
        </Grid> 
    );
};



export default Mall;