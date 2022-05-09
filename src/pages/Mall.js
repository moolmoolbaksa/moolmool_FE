import React from 'react';
import { useSelector } from 'react-redux';

import MypageTop from '../components/store/MypageTop';
import ItemGrid from '../components/store/ItemGrid';
import { Grid } from '../elements/index';
import DetailBottom from '../components/detail/DetailBottom';

const Mall = (props) => {
    const {other_item_list, ...other_info} = useSelector(state => state.user.other);
    // const item_list = useSelector(state => state.user.other_item_list);
    console.log(other_item_list, other_info)
    return (
        <Grid>   
            <Grid
                padding="0 16px"
                position="relative" 
            >
                <MypageTop user_info={other_info}/>
                <ItemGrid item_list={other_item_list} type="mall"/>
            </Grid>
            <DetailBottom/>
        </Grid> 
    );
};



export default Mall;