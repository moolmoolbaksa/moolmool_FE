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
import { ReactComponent as EmptyIcon } from '../images/outline_error_outline_black_48pt_2x 1.svg';
import { useParams } from 'react-router-dom';
import {} from '../redux/modules/tradehistory';
const Trade = (props) => {
    const dispatch = useDispatch();

   
    const {myImages, ...opponent_info} = useSelector(state => state.product.barter_info);
    const {nickname, degree, title, contents} = useSelector(state => state.product.product_info);
    const trade_item = useSelector(state => state.product.trade_item);
    
       //교환수정시 세팅
    const barterId = useParams().barterId;
    const is_edit = barterId?true:false;
    console.log(is_edit);
    const mytrade=useSelector(state=>state.tradehistory.Senthistory).filter((arr)=>arr.barterId==barterId); //string==number
    const {barterItem, ...other_info} = useSelector(state => state.tradehistory.Checkhistory);
    console.log(barterItem);
    console.log(other_info);
    // console.log(mytrade[0]);
    console.log(myImages);
    // const editItemList=

    const onDoTrade = () => {
        if(!trade_item.length) return dispatch(setAlertModal(true));
        dispatch(setTradeModal(true));
    };

    return (
        <>
        <Grid
            height="100%"
            is_flex
            is_column
        >
            {is_edit?<LocationBar title="교환수정" />:<LocationBar title="교환신청" />}
            {/* <LocationBar title="교환신청" /> */}
            <TradeItemCard
                nickname={is_edit?other_info.nickname:nickname}
                degree={is_edit?other_info.degree:degree}
                title={is_edit?other_info.title:title}
                contents={is_edit?other_info.contents:contents}
                image={is_edit?other_info.image:opponent_info.sellerImages}
            />
            {myImages.length
                ?  
                {is_edit}? 
                  <ItemWrap>
                    <ItemGrid is_edit={is_edit} type="trade" item_list={myImages}/>
                  </ItemWrap>
                : //교환수정인지 아닌지
                  <ItemWrap>
                    <ItemGrid is_edit={is_edit} type="trade" item_list={myImages}/>
                  </ItemWrap>
                : // image.length가 아무것도 없을때 
                <EmptyWrap>
                  <EmptyIcon />
                  <Grid is_flex is_column gap="3px">
                    <Text>보따리가 비어있어요.</Text> 
                    <Text>아이템을 추가한 후 교환을 진행하세요.</Text>
                  </Grid>
                </EmptyWrap>
            }
            {is_edit?
            <Button
                // onClick={onDoTrade}
                disabled={myImages.length === 0}
            >
                교환 수정하기
            </Button>:
            <Button
            onClick={onDoTrade}
            disabled={myImages.length === 0}
            >
              교환 신청하기
            </Button>}
        </Grid>
        <TradeModal />
        <AlertModal>아이템을 선택해주세요.</AlertModal>
        </>
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
`;

const Text = styled.div`
    font-size: 18px;
    color: #9d9d9d;
    word-spacing: -2px;
    letter-spacing: -1px;
    text-align: center;
`;

export default Trade;