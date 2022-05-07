import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from '../elements/index';
import { useSelector } from 'react-redux';
import LocationBar from '../components/LocationBar';
import TradeItemCard from '../components/trade/TradeItemCard';
import ItemGrid from '../components/store/ItemGrid';

const Trade = (props) => {
    const {myImages, ...opponent_info} = useSelector(state => state.product.barter_info);
    console.log(myImages, opponent_info)
    return (
        <Grid
            height="100%"
        >
            <LocationBar title="교환신청" />
            <Grid
                height="calc(100%-60px)"
                position="relative"
                padding="0 16px"
            >
                <TradeItemCard {...opponent_info}/>
                <ItemGrid item_list={myImages}/>
            </Grid>
            <Button>교환신청하기</Button>
        </Grid>
    );
};

const Button = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #ffca39;
    padding: 16px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
`;

export default Trade;