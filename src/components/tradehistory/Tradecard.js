import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from '../../elements/index';
import { HistoryAPI } from '../../shared/api';
import { useDispatch } from 'react-redux';
import { delHistory, completeTrade, acceptTrade, getCheckHistory } from '../../redux/modules/tradehistory';
import { history } from '../../redux/configureStore';

const Tradecard = (props) => {
    const {barterId, barterItem, date, isScore, isTrade, myItem, myPosition, profile, status, userId, usernickname } = props;
    
    const dispatch = useDispatch();
    
    const onGoDetail = () => {
        HistoryAPI.getTradeCheck(barterId)
            .then((res)=>{
                console.log(res);
                dispatch(getCheckHistory(res.data));
            })
            .catch((error)=>{
                console.log(error);
            })
        history.push('/trcheck');
    };

    const buttonSetting = () => {
        if(status===1 && myPosition==="buyer"){
            return  <Buttonwrap>
                        <LeftBtn>교환 수정</LeftBtn>
                        <RightBtn onClick={handleCancelTrade}>교환 취소</RightBtn>
                    </Buttonwrap>
        }
        else if(status===1 && myPosition==="seller"){
            return  <Buttonwrap>
                        <LeftBtn onClick={handleAccept}>수락</LeftBtn>
                        <RightBtn onClick={handleReject}>거절</RightBtn>
                    </Buttonwrap>
        }
        else if(status===2 && isTrade===false){
            return  <Buttonwrap>
                        <LeftBtn onClick={handleComplete}>교환 완료하기</LeftBtn>
                        <RightBtn onClick={handleCancelTrade}>교환 취소하기</RightBtn>
                    </Buttonwrap>
        }
        else if(status===2 && isTrade===true){
            return  <Buttonwrap>
                        <LeftBtn onClick={handleComplete}>완료 취소(대기중)</LeftBtn>
                        <RightBtn onClick={handleCancelTrade}>교환 취소하기</RightBtn>
                    </Buttonwrap>
        }
        else if(status===3 && isScore===false){
            return  <Buttonwrap>
                        <LeftBtn onClick={handleAccept}>평가하기</LeftBtn>
                    </Buttonwrap>
        }
        else if(status===3 && isScore===true){
            return  <Buttonwrap>
                        <LeftBtn onClick={handleAccept}>평가완료</LeftBtn>
                    </Buttonwrap>
        }   
    };
    
    const handleAccept=()=>{
        dispatch(acceptTrade({barterId:barterId,myPosition:myPosition}));
        HistoryAPI.acceptTrade(barterId)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    const handleReject=()=>{
        HistoryAPI.rejectTrade(barterId)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
        dispatch(delHistory({barterId:barterId,myPosition:myPosition}));
    };

    const handleComplete=()=>{
        dispatch(completeTrade({barterId:barterId,myPosition:myPosition}));

        HistoryAPI.completeTrade(barterId)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error)
        })
        
    }
    const handleCancelComplete=()=>{
        dispatch(completeTrade({barterId:barterId,myPosition:myPosition}));
        

    }
    const handleCancelTrade=()=>{
        dispatch(delHistory({barterId:barterId,myPosition:myPosition}));
        HistoryAPI.cancelTrade(barterId)
        .then((res)=>{
            console.log(res);

        })
        .catch((error)=>{
            console.log(error);

        })
    }
      
    return (
        <Container>
            <Cardwrap>
                <Tradetitle>
                    <Text text={`${usernickname}님과의 교환`} size="18px" bold="bold" letterSpacing="-.67px" width="max-content"/>
                    <StatusLabel>교환중</StatusLabel>
                </Tradetitle>
                <Wrap onClick={onGoDetail}>
                    <ImageOutter>
                        <ImageWrap src={myPosition === "buyer" ? barterItem[0].itemImg : myItem[0].itemImg} onClick={onGoDetail}/>
                    </ImageOutter>
                    <Grid
                        is_flex
                        is_column
                        gap="5px"
                        margin="10px 0 0"
                    >
                        <Text 
                            text={myPosition==="buyer" ? barterItem[0].title : myItem[0].title}
                            size="20px"
                            bold="bold"
                        />
                        <Text 
                            text={myPosition==="buyer" ? barterItem[0].contents : myItem[0].contents}
                            size="14px"
                            color="#9D9D9D"
                        />
                    </Grid>
                </Wrap>
                {buttonSetting()}
            </Cardwrap>
        </Container>
    );
};

export default Tradecard;

const Container = styled.div`
    padding: 0 16px;
    margin-top: 15px;
`;

const StatusLabel = styled.div`
    background-color: #2B9ECF;
    font-size: 12px;
    color: white;
    padding: 0px 10px;
    border-radius: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrap = styled.div`
    padding: 15px 0px 15px;
    display: grid;
	position: relative;
    grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
    gap: 15px;
`;

const ImageOutter = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: calc(10 / 10 * 100%);
`;

const ImageWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
	height: 100%;
    background: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
`;

const Cardwrap = styled.div`
    padding: 0 10px;
    border-bottom: 1px #c4c4c4 solid;
`;

const Tradetitle = styled.div`
    display: flex;
    gap: 10px;
`;

const Buttonwrap = styled.div`
    display:flex;
    gap: 10px;
    margin-bottom: 10px;
`;

const LeftBtn = styled.button`
    background-color: #9d9d9d;
    color: white;
    height: 40px;
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
    letter-spacing: -.67px;
    cursor: pointer;
`;

const RightBtn = styled.button`
    background-color: #FFCA39;
    height: 40px;
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
    letter-spacing: -.67px;
    cursor: pointer;
`;


