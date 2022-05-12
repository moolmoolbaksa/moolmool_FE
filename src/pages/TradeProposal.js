import React from 'react';
import styled from 'styled-components';

import { Grid, Text } from '../elements/index';
import { useDispatch, useSelector } from 'react-redux';
import LocationBar from '../components/LocationBar';
import TradeItemCard from '../components/trade/TradeItemCard';
import ItemGrid from '../components/store/ItemGrid';
import { setAlertModal, setTradeModal } from '../redux/modules/modal';
import TradeModal from '../components/modal/TradeModal';
import AlertModal from '../components/modal/AlertModal';
import TabBar from '../components/TabBar';

const TradeProposal = (props) => {
    const dispatch = useDispatch();

    const {barterItem, ...item_info} = useSelector(state => state.notification.barter_info);
    console.log(barterItem, item_info)
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
                <TradeItemCard {...item_info}/>
                <Text 
                    text={`${item_info.opponentNickname}님의 교환 제시 물건`}
                    size="20px"
                    bold="bold"
                    margin="20px 0 0 0"
                    wordSpacing="-1px"
                />
                <ItemGrid type="mall" item_list={barterItem}/>
            </Grid>
            <ButtonWrap>
                <ButtonA>
                    교환 수락
                </ButtonA>
                <ButtonB>
                    교환 거절
                </ButtonB>
            </ButtonWrap>
            <TabBar />
            <TradeModal />
            <AlertModal />
        </Grid>
    );
};

const ButtonWrap = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 10px;
    bottom: 70px;
    width: 100%;
    margin-bottom: 20px;
    padding: 0 16px;
`;

const ButtonA = styled.div`
    width: 100%;
    background-color: #FFD467;
    padding: 16px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
`;

const ButtonB = styled.div`
    width: 100%;
    background-color: #666666;
    color: white;
    padding: 16px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
`;

export default TradeProposal;