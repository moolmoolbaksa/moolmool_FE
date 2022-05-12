import React from 'react';
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
    console.log(opponent_info)
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
                <TradeItemCard
                    nickname={nickname}
                    degree={degree}
                    title={title}
                    contents={contents}
                    image={opponent_info.sellerImages}
                />
                <ItemGrid type="trade" item_list={myImages}/>
            </Grid>
            <Button
                onClick={onDoTrade}
            >
                교환신청하기
            </Button>
            <TradeModal />
            <AlertModal />
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