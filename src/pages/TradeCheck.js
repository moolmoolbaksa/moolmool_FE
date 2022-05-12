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

    const {myImages, ...opponent_info} = useSelector(state => state.product.barter_info);
    const trade_item = useSelector(state => state.product.trade_item);
    
    return (
        <Grid
            height="100%"
        >
            <LocationBar title="님과의 교환" />
            <Grid
                height="calc(100%-60px)"
                position="relative"
                padding="0 16px"
            >
                <TradeItemCard/>
                <Text 
                    text={`님의 교환 제시 물건`}
                    size="20px"
                    bold="bold"
                    margin="20px 0 0 0"
                    wordSpacing="-1px"
                />
                <ItemGrid type="mall" item_list={myImages}/>
            </Grid>
            <TabBar />
        </Grid>
    );
};

export default TradeCheck;