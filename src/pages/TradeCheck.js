import React from 'react';
import styled from 'styled-components';

import { Grid, Text } from '../elements/index';
import { useSelector } from 'react-redux';
import LocationBar from '../components/LocationBar';
import TradeItemCard from '../components/trade/TradeItemCard';
import ItemGrid from '../components/store/ItemGrid';
import TabBar from '../components/TabBar';

const TradeCheck = (props) => {
    const {barterItem, ...other_info} = useSelector(state => state.tradehistory.Checkhistory);
   
    return (
        <Grid
            height="100%"
            is_flex
            is_column
        >
            <LocationBar title='교환 신청 내역' />
            <TradeItemCard {...other_info}/>
            <Wrap
                height="calc(100%-60px)"
                position="relative"
                padding="0 16px"
            >
                <Text 
                    text='제시된 물건'
                    size="20px"
                    bold="bold"
                    margin="20px 0 0 0"
                    wordSpacing="-1px"
                />
                <ItemGrid type="mall" item_list={barterItem}/>
            </Wrap>
            <TabBar position/>
        </Grid>
    );
};

const Wrap = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    padding: 0 16px;
`;

export default TradeCheck;