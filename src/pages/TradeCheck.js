import React from 'react';
import styled from 'styled-components';

import { Grid, Text } from '../elements/index';
import { useDispatch, useSelector } from 'react-redux';
import LocationBar from '../components/LocationBar';
import TradeItemCard from '../components/trade/TradeItemCard';
import ItemGrid from '../components/store/ItemGrid';
import TabBar from '../components/TabBar';

const TradeCheck = (props) => {
    const dispatch = useDispatch();

    const {barterItem, ...other_info} = useSelector(state => state.tradehistory.Checkhistory);
    // console.log(barterItem, other_info)
    return (
        <Grid
            height="100%"
        >
            <LocationBar title='교환 신청 내역' />
            <Grid
                height="calc(100%-60px)"
                position="relative"
                padding="0 16px"
            >
                <TradeItemCard {...other_info}/>
                <Text 
                    text='제시된 물건'
                    size="20px"
                    bold="bold"
                    margin="20px 0 0 0"
                    wordSpacing="-1px"
                />
                <ItemGrid type="mall" item_list={barterItem}/>
            </Grid>
            <TabBar />
        </Grid>
    );
};

export default TradeCheck;