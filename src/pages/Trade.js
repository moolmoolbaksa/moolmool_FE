import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Grid } from '../elements/index';
import { useDispatch, useSelector } from 'react-redux';
import LocationBar from '../components/LocationBar';
import TradeItemCard from '../components/trade/TradeItemCard';
import ItemGrid from '../components/store/ItemGrid';
import { setAlertModal, setTradeModal } from '../redux/modules/modal';
import TradeModal from '../components/modal/TradeModal';
import AlertModal from '../components/modal/AlertModal';

const Trade = (props) => {
    const dispatch = useDispatch();
   
    const {myImages, ...opponent_info} = useSelector(state => state.product.barter_info);
    const {nickname, degree, title, contents} = useSelector(state => state.product.product_info);
    const trade_item = useSelector(state => state.product.trade_item);
    
    const onDoTrade = () => {
        if(!trade_item.length) return dispatch(setAlertModal(true));
        dispatch(setTradeModal(true));
    };

    return (
        <Grid
            height="100%"
            is_flex
            is_column
        >
            <LocationBar title="교환신청" />
            <TradeItemCard
                nickname={nickname}
                degree={degree}
                title={title}
                contents={contents}
                image={opponent_info.sellerImages}
            />
            {myImages.length
                ?   <ItemWrap>
                        <ItemGrid type="trade" item_list={myImages}/>
                    </ItemWrap>
                :   <EmptyWrap>
                        <span className="material-symbols-outlined">
                            add_shopping_cart
                        </span>
                        <Grid is_flex is_column gap="3px">
                            <Text>보따리가 비어있어요.</Text> 
                            <Text>아이템을 추가한 후 교환을 진행하세요.</Text>
                        </Grid>
                    </EmptyWrap>
            }
            <Button
                onClick={onDoTrade}
                disabled={myImages.length === 0}
            >
                교환신청하기
            </Button>
            <TradeModal />
            <AlertModal />
        </Grid>
    );
};

const Button = styled.button`
    width: 100%;
    background-color: #ffca39;
    padding: 16px;
    border: none;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
`;

const ItemWrap = styled.div`
    padding: 0 16px;
    flex-grow: 1;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none; 
    };
`;

const EmptyWrap = styled.div`
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    gap: 10px;
    overflow: hidden;
    span {
        font-size: 100px;
        text-align: center;
        text-indent: -9999;
    };
`;

const Text = styled.div`
    font-size: 18px;
    color: #9d9d9d;
    word-spacing: -2px;
    letter-spacing: -1px;
    text-align: center;
`;

export default Trade;