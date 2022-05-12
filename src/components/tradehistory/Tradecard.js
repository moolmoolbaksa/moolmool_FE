import React from 'react';
import styled from 'styled-components';
import Chip from '@mui/material/Chip';
import { Text, Grid, Input, Button,Image } from '../../elements/index';

import { HistoryAPI } from '../../shared/api';
import {useDispatch,useSelector} from 'react-redux';
import {delHistory,completeTrade,acceptTrade} from '../../redux/modules/tradehistory';
const Tradecard = (props) => {
    const {barterId,barterItem, date, isScore, isTrade,myItem, myPosition,profile,status,userId,usernickname}=props;
    const dispatch = useDispatch();
    const onGoDetail = () => {
    };
    

    const buttonSetting = () => {
        console.log(status);
        console.log(myPosition);

        // console.log(barterId==1 && myPosition==="buyer");
        // console.log(barterId==1 && myPosition==="seller");
        
        
        if(status==1 && myPosition==="buyer")
        {
            return (<Buttonwrap>
                <Button background='#9D9D9D'  color='white' height='40px' margin='10px 10px 10px 10px' text='교환 수정' ></Button>
                <Button background='#FFCA39' height='40px' margin='10px 10px 10px 10px' text='교환 취소' ></Button>
                </Buttonwrap>);
        }
        else if(status==1 && myPosition==="seller")
        {
            return (<Buttonwrap>
                <Button background='#9D9D9D'  color='white' height='40px' margin='10px 10px 10px 10px' text='수락' onClick={handleAccept}></Button>
                <Button background='#FFCA39' height='40px' margin='10px 10px 10px 10px' text='거절' onClick={handleReject} ></Button>
                </Buttonwrap>);
        }
        else if(status==2 && isTrade===false )
        {
            return (<Buttonwrap>
                <Button background='#9D9D9D'  color='white' height='40px' margin='10px 10px 10px 10px' text='교환 완료하기' onClick={handleComplete}></Button>
                <Button background='#FFCA39' height='40px' margin='10px 10px 10px 10px' text='교환 취소하기' onClick={handleReject} ></Button>
                </Buttonwrap>);
        }
        else if(status==2 && isTrade===true)
        {
            return (<Buttonwrap>
                <Button background='#9D9D9D'  color='white' height='40px' margin='10px 10px 10px 10px' text='완료 취소' onClick={handleCancelComplete}></Button>
                <Button background='#FFCA39' height='40px' margin='10px 10px 10px 10px' text='교환 취소하기' onClick={handleReject} ></Button>
                </Buttonwrap>);
        }
        else if(status==3 && isScore===false)
        {
            return (<Buttonwrap>
                <Button background='#9D9D9D'  color='white' height='40px' margin='10px 10px 10px 10px' text='평가하기' onClick={handleAccept}></Button>
                </Buttonwrap>);
        }
        else if(status==3 && isScore===true)
        {
            return (<Buttonwrap>
                <Button background='#9D9D9D'  color='white' height='40px' margin='10px 10px 10px 10px' text='평가완료' ></Button>
                </Buttonwrap>);
        }

      };
    
    const handleAccept=()=>{
        dispatch(acceptTrade({barterId:barterId,myPosition:myPosition}));
        // HistoryAPI.acceptTrade(barterId)
        // .then((res)=>{
        //     console.log(res);
        // })
        // .catch((error)=>{
        //     console.log(error);
        // })

    }
    const handleReject=()=>{
        
        HistoryAPI.rejectTrade(barterId)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
        dispatch(delHistory({barterId:barterId,myPosition:myPosition}));
    }
    const handleComplete=()=>{
        // dispatch(completeTrade({barterId:barterId,myPosition:myPosition}));

        // HistoryAPI.completeTrade(barterId)
        // .then((res)=>{
        //     console.log(res);
        // })
        // .catch((error)=>{
        //     console.log(error)
        // })
        
    }
    const handleCancelComplete=()=>{
        dispatch(completeTrade({barterId:barterId,myPosition:myPosition}))

    }
      
      return (
        <React.Fragment>
            <Cardwrap>
                <Tradetitle>
                    {/* <p>{nickname}님과의 교환</p> */}
                    <p>우아악님과의 교환 &nbsp; </p>
                    <Chip label="교환중" color="primary" size='small'/>
                </Tradetitle>
                <Background>
                    <Image shape='square' size='13' src={myPosition==="buyer"?barterItem[0].itemImg:myItem[0].itemImg} onClick={onGoDetail} padding='20px' vhvw={true}></Image>
                    
                    <Info>
                        <InfoText>
                            <Title>
                                <Titletext>{myPosition==="buyer"?barterItem[0].title:myItem[0].title}</Titletext>                     
                            </Title>
                            
                            <Description>Content</Description>
                        </InfoText>


                    </Info>
                </Background>
                {/* <Buttonwrap>
                    <Button background='#9D9D9D'  color='white' height='40px' margin='10px 10px 10px 10px' text='교환 취소' ></Button>
                    <Button background='#FFCA39' height='40px' margin='10px 10px 10px 10px' text='교환확정' ></Button>
                </Buttonwrap> */}
                {buttonSetting()}
            </Cardwrap>
        </React.Fragment>
        

    );
};

export default Tradecard;



const Titletext=styled.p`
    display:block;
    font-size:1.2rem;
    font-weight:900;
    margin:0px 0px 10px 0px;
`;
const Cardwrap=styled.div`
border-bottom: 1px solid grey;
`;
const Tradetitle=styled.div`
    display:flex;
    margin:10px 0px 0px 10px;
`;
const Background=styled.div`

display:flex;
background: #FFFFFF;
box-sizing:content-box;
height:15vh;
margin:0px 0px 5px 0px;
`;

const Buttonwrap=styled.div`
    display:flex;
`;

const Info=styled.div`
width: 100%;
height: 20%;
margin:0px 0px 0px 1vh;
`;

const InfoText=styled.div`
    height:12vh;
    padding:10px;
`;

const Title=styled.div`
// position: absolute;
display:flex;
font-family: 'DM Serif Display';
font-style: normal;
font-weight: 400;
font-size: 12px;
& ::before{
    content:'  ';
}
// line-height: 25px;`;

const Description=styled.h2`

/* Open Sans / 16 sp • Body 2 */
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 0.8rem;
// line-height: 25px;
/* or 156% */`;




