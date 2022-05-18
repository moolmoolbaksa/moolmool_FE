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
            {checkItem &&   <CheckLabel>
                                <span className="material-symbols-outlined">
                                    done
                                </span>
                            </CheckLabel>
            }
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
    background: ${props => props.is_check ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),' : ''} url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
    cursor: pointer;
`;

const CheckLabel = styled.div`
    position: absolute;
    z-index: 1;
    top: 5%;
    right: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${props => props.theme.palette.yellow};
    span {
        color: black;
        font-size: 18px;
        font-weight: bold;
    };
`;

export default TradeMyItem;