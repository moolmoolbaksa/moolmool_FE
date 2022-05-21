import React from 'react';
import styled from 'styled-components';

import { Grid, Text } from '../elements/index';
import { useSelector } from 'react-redux';
import LocationBar from '../components/LocationBar';
import TradeItemCard from '../components/trade/TradeItemCard';
import ItemGrid from '../components/store/ItemGrid';
import TradeModal from '../components/modal/TradeModal';
import AlertModal from '../components/modal/AlertModal';
import TabBar from '../components/TabBar';
import { useParams } from 'react-router-dom';
import { HistoryAPI } from '../shared/api';
import { history } from '../redux/configureStore';

const TradeProposal = props => {
    const { barterItem, ...item_info } = useSelector(state => state.notification.noti_barter);
    const baterId = useParams();

    const acceptTrade = () => {
        HistoryAPI.acceptTrade(baterId.baterid)
            .then(res => {
                console.log(res);
                window.alert('교환 수락하셨습니다.');
                history.goBack();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const rejectTrade = () => {
        HistoryAPI.rejectTrade(baterId.baterid).then(res => {
            console.log(res);
            window.alert('교환을 거절하셨습니다.');
            history.goBack();
        });
    };

    const cancelTrade = () => {
        HistoryAPI.cancelTrade(baterId.baterid)
            .then(res => {
                console.log(res);
                history.push('/noti');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Grid height="100%">
            <LocationBar title="교환신청" />
            <Grid height="calc(100%-60px)" position="relative" padding="0 16px">
                <TradeItemCard {...item_info} />
                <Text
                    text={`${item_info.opponentNickname}님의 교환 제시 물건`}
                    size="20px"
                    bold="bold"
                    margin="20px 0 0 0"
                    wordSpacing="-1px"
                />
                <ItemGrid type="mall" item_list={barterItem} />
            </Grid>
            <ButtonWrap>
                {item_info.accepted === 'true' ? (
                    <ButtonB onClick={cancelTrade}>교환 취소</ButtonB>
                ) : (
                    <>
                        <ButtonA onClick={acceptTrade}>교환 수락</ButtonA>
                        <ButtonB onClick={rejectTrade}>교환 거절</ButtonB>
                    </>
                )}
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
    background-color: #ffd467;
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
