import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { setTrade } from '../../redux/modules/product'
import { ReactComponent as CheckIcon } from '../../images/check_icon.svg';

const TradeMyItem = ({itemId, image}) => {
    const dispatch = useDispatch();
    const [checkItem, setCheckItem] = useState(false);
    
    const onCheckItem = () => {
        setCheckItem(!checkItem);
        dispatch(setTrade(itemId));
    };

    return (
        <ImageOutter onClick={onCheckItem}>
            <ImageInner 
                is_check={checkItem}
                src={image}
            >
                {checkItem && <CheckIcon width="80" height="80" fill="white"/>}
            </ImageInner>
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
    background: ${props => props.is_check ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),' : ''} url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default TradeMyItem;