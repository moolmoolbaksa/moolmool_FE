import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Text, Grid } from '../../elements/index';
import { history } from '../../redux/configureStore';
import { api as ProductActions } from '../../redux/modules/product';
import TradeMyItem from '../trade/TradeMyItem';
import ItemImage from './ItemImage';

const ItemGrid = ({item_list, type}) => {
    const dispatch = useDispatch();

    const onGoCreateItem = () => {
        history.push('/registerproduct');
    };

    const onGoScrabPage = () => {
        dispatch(ProductActions.getMyScrabListApi());
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
    };

    if(type==='scrab'){
        return (
            <>
                <Grid
                    padding="10px 0 0 0"
                    flex
                >
                    <Text 
                        text="찜한 상품"
                        bold="bold"
                        size="24px"
                        letterSpacing="-1px"
                        width="max-content"
                    />
                    <StyledLink
                        to="/scrab"
                        onClick={onGoScrabPage}
                    >
                        더보기
                    </StyledLink>
                </Grid>
                <Grid gridBox margin="20px 0">
                    {item_list && item_list.map((v, i) => {
                        return  <ItemImage 
                                    key={i}
                                    {...v}
                                />       
                    })}
                </Grid>
            </>
        );
    };

    if(!item_list.length){
        return (
            <Grid
                padding="20px 0 0 0"
                margin="0 0 20px"
                is_flex
                is_column
                gap="10px"
            >
                <Text
                    text="나의 보따리"
                    bold="bold"
                    size="24px"
                    letterSpacing="-1px"
                />
                <PlusZone onClick={onGoCreateItem}>
                    <Text 
                        text="보따리에 물건을 추가해보세요!"
                        textAlign="center"
                        size="16px"
                        color="#ffca39"
                        bold="bold"
                        padding="50px 0"
                    />
                </PlusZone>
            </Grid> 
        );
    };

    const new_item_list = Array.from({length: 9}, v => '');
    for(let i=0; i < 9; i++){
        if(item_list[i]){
            new_item_list[i] = item_list[i];
        };
    };

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
                {new_item_list && new_item_list.map((v, i) => {
                    return  v   ?   <ItemImage 
                                        key={i}
                                        {...v}
                                    /> 
                                :   <PlusItem key={i} onClick={onGoCreateItem}>
                                        <span className="material-symbols-outlined">
                                            add_circle
                                        </span>
                                    </PlusItem>   
                })}
            </Grid>
        </Grid> 
    );
};

const PlusItem = styled.div`
    width: 100%;
    height: 100%;
    border: 2px lightgray solid;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
    & span {
        text-indent: -9999;
        color: lightgray;
        font-size: 30px;
    }
`;

const PlusZone = styled.div`
    width: 100%;
    border: 2px #ffca39 solid;
    border-radius: 5px;
    cursor: pointer;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 13px;
    line-height: 12.5px;
    text-align: right;
    color: black;
    letter-spacing: -1px;
    border-bottom: 1px #9d9d9d solid;
    cursor: pointer;
`;

export default ItemGrid;