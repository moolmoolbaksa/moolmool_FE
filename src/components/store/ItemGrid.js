import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Text, Grid } from '../../elements/index';
import { history } from '../../redux/configureStore';
import TradeMyItem from '../trade/TradeMyItem';
import ItemImage from './ItemImage';

const ItemGrid = ({item_list, type}) => {
    const location = useLocation();
    const onGoCreateItem = () => {
        history.push('/registerproduct');
    };

    if(type==='trade'){
        return (
            <Grid
                padding="20px 0 0 0"
            >
                <Text
                    text="나의 보따리"
                    bold="bold"
                    size="24px"
                    letterSpacing="-1px"
                />
                <Grid gridBox margin="20px 0">
                    {item_list && item_list.map((v, i) => {
                        return  <TradeMyItem 
                                    key={i}
                                    {...v}
                                />       
                    })}
                </Grid>
            </Grid> 
        );
    };
    if(type==='mall'){
        return (
            <Grid
                padding="20px 0 0 0"
            >
                <Grid gridBox margin="20px 0">
                    {item_list && item_list.map((v, i) => {
                        return  <ItemImage 
                                    key={i}
                                    {...v}
                                />       
                    })}
                </Grid>
            </Grid> 
        );
    }
    return (
        <Grid
            padding="20px 0 0 0"
        >
            <Text
                text="나의 보따리"
                bold="bold"
                size="24px"
                letterSpacing="-1px"
            />
            <Grid gridBox margin="20px 0">
                {item_list && item_list.map((v, i) => {
                    return  <ItemImage 
                                key={i}
                                {...v}
                            />       
                })}
                {item_list.length !== (0 || 9) && <PlusItem onClick={onGoCreateItem}>+</PlusItem>}
            </Grid>
        </Grid> 
    );
};

const PlusItem = styled.div`
    width: 100%;
    height: 100%;
    border: 1px gray solid;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
`;

export default ItemGrid;