import React, { useState } from 'react';
import styled from 'styled-components';

import { Text, Grid } from '../../elements/index';
import { HistoryAPI } from '../../shared/api';
import { useDispatch, useSelector } from 'react-redux';
import { delHistory, completeTrade, acceptTrade, getCheckHistory,cancelCompleteTrade,setOppentisTrade } from '../../redux/modules/tradehistory';
import { history } from '../../redux/configureStore';
import RatingModal from './RatingModal';

const Tradecard = (props) => {
    const {barterId, barterItem, date, isScore, isTrade, myItem, myPosition, profile, status, userId, usernickname,userIsTrade } = props;
    // const barter= myPosition==="buyer"?:useSelector(state=>state.)
    const myid=useSelector(state=>state.user.user_info.userId);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const statusLbel1=()=>{
      if(status===1)
      {
        return 
        // <StatusLabel>교환수락 대기중</StatusLabel>
      }
      else if(status===2 && userIsTrade===false)
      {
        return <>
        {/* <StatusLabel>교환중</StatusLabel> */}
        <StatusLabel color=" #FFCA39">상대방 기다리는중</StatusLabel></>
      }
      else if(status===2 && userIsTrade===true)
      {
        return <>
        {/* <StatusLabel>교환중</StatusLabel> */}
        <StatusLabel color="red">상대방 교환확정!!</StatusLabel></>
      }
      else if(status===3)
      {
        return 
        // <StatusLabel color="red">교환완료</StatusLabel>
      }
    };
    const openModal=()=>{
      console.log('hi');
      setIsModalOpen(true);
    }
    const closeModal=()=>{
      setIsModalOpen(false);
    }
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
    const onEdit=()=>{
      HistoryAPI.getTradeCheck(barterId)
            .then((res)=>{
                console.log(res);
                dispatch(getCheckHistory(res.data));
            })
            .catch((error)=>{
                console.log(error);
            })
            .then(()=>{
              history.push(`/editTrade/${barterId}`)
            })
        

    }
    const buttonSetting = () => {
        if(status===1 && myPosition==="buyer"){
            return  <Buttonwrap>
                        <LeftBtn onClick={handleCancelTrade}>신청 취소</LeftBtn>
                        <RightBtn onClick={onEdit}>교환 수정</RightBtn>
                    </Buttonwrap>
        }
        else if(status===1 && myPosition==="seller"){
            return  <Buttonwrap>
                        <LeftBtn onClick={handleReject}>거절</LeftBtn>
                        <RightBtn onClick={handleAccept}>수락</RightBtn>
                    </Buttonwrap>
        }
        else if(status===2 && isTrade===false){
            return  <Buttonwrap>
                        <LeftBtn onClick={handleCancelTrade}>교환 취소하기</LeftBtn>
                        <RightBtn onClick={handleComplete}>교환 완료하기</RightBtn>
                    </Buttonwrap>
        }
        else if(status===2 && isTrade===true &&userIsTrade===false){
            return  <Buttonwrap>
                        <LeftBtn onClick={handleCancelTrade}>교환 취소하기</LeftBtn>
                        <RightBtn onClick={handleCancelComplete}>완료 취소</RightBtn>
                    </Buttonwrap>
        }
        else if(isScore===false && isTrade===true&& userIsTrade===true){
            return  <Buttonwrap>
                        <Btn onClick={openModal}>평가하기</Btn>
                    </Buttonwrap>
        }
        else if(isScore===true){
            return  <Buttonwrap>
                        <Btn disabled>평가완료</Btn>
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
        // dispatch(setOppentisTrade({barterId:barterId.barterId,myPosition:myPosition}));
        HistoryAPI.completeTrade(barterId)
        .then((res)=>{
            console.log(res);
            dispatch(setOppentisTrade({barterId:barterId,myPosition:myPosition,userIsTrade:res.data.isTrade,status:res.data.status}));
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const handleCancelComplete=()=>{
        dispatch(cancelCompleteTrade({barterId:barterId,myPosition:myPosition}));
        HistoryAPI.gobackCompleteTrade(barterId)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
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
    };
    return (
        <Container>
            <Cardwrap>
                <Tradetitle>
                    <Text text={`${usernickname}님과의 교환`} size="18px" bold="bold" letterSpacing="-.67px" width="max-content"/>
                    {statusLbel1()}
                </Tradetitle>
                <Wrap onClick={onGoDetail}>
                    <ImageOutter>
                        <ImageWrap src={myPosition === "buyer" ? barterItem[0].itemImg : myItem[0].itemImg} />
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
                
                {isModalOpen&&<RatingModal barterId={barterId} userId={userId} nickcname={usernickname} 
                          src={myPosition === "buyer" ? barterItem[0].itemImg : myItem[0].itemImg}
                          myPosition={myPosition} closeModal={closeModal} open={isModalOpen}
                  ></RatingModal>}
                
            </Cardwrap>
            {buttonSetting()}
        </Container>
    );
};

export default Tradecard;

const Container = styled.div`
    // margin-top: 15px;
    background: white;
    margin-bottom:5px;
`;

const StatusLabel = styled.div`
    background-color:${props=>props.color?props.color:"#2B9ECF"} ;
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
  padding: 16px 16px 0 16px;
  border-bottom: 1px #c4c4c4 solid;
`;

const Tradetitle = styled.div`
  display: flex;
  gap: 10px;
`;

const Buttonwrap = styled.div`
  display:flex;
`;

const LeftBtn = styled.button`
  background-color: white;
  color: #666666;
  height: 40px;
  width:50%;
  font-weight: bold;
  font-size: 16px;
  border:none;
  // border-top: 1px solid #C4C4C4;
  border-bottom: 1px solid #C4C4C4;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  letter-spacing: -.67px;
  cursor: pointer;
`;

const RightBtn = styled.button`
    padding: 10px 0;
    background-color:white;
    color:#666666;
    height: 40px;
    width: 50%;
    font-weight: bold;
    font-size: 16px;
    border:none;
    // border-top: 1px solid #C4C4C4;
    border-left: 1px solid #C4C4C4;
    border-bottom: 1px solid #C4C4C4;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
    letter-spacing: -.67px;
    cursor: pointer;
`;

const Btn = styled.button`
    padding: 10px 0;
    background-color:white;
    color:#666666;
    height: 40px;
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    border:none;
    // border-top: 1px solid #C4C4C4;
    border-left: 1px solid #C4C4C4;
    border-bottom: 1px solid #C4C4C4;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
    letter-spacing: -.67px;
    cursor: pointer;
`;


