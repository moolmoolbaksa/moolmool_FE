import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { api as productActions, setTrade } from '../../redux/modules/product';

const TradeMyItem = ({itemId, image}) => {
    const dispatch = useDispatch();
    const [checkItem, setCheckItem] = useState(false);
    
    const onCheckItem = () => {
        setCheckItem(!checkItem);
        dispatch(setTrade(itemId));
    };

    const trade_item = useSelector(state => state.product.trade_item);
    console.log(checkItem, trade_item)
    return (
        <ImageOutter onClick={onCheckItem}>
            <ImageInner 
                is_check={checkItem}
                src={image}
            />
        </ImageOutter>
    );
};

const ImageOutter = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 100%;
`;

const ImageInner = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: ${props => !props.is_check ? 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),' : ''} url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
    border: ${props => props.is_check ? '5px #0095B7 solid' : ''};
    cursor: pointer;

    &:hover {
        background: url('${props => props.src}'), linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
`;

export default TradeMyItem;