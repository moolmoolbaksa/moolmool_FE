import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import { FaStar } from "react-icons/fa";
import {Image} from "../../elements/index";
import { useDispatch} from 'react-redux';
import { HistoryAPI, } from '../../shared/api';

import { rateTrade,acceptTrade} from '../../redux/modules/tradehistory'
const RatingModal = (props) => {
  const [rating, setRating] = useState(0);
  const dispatch=useDispatch();
  console.log(props);
  const test=()=>{

  }
  const handleSubmit=()=>{
    dispatch(rateTrade({barterId:props.barterId,myPosition:props.myPosition}));
    // dispatch(acceptTrade({barterId:props.barterId,myPosition:props.myPosition}));
    console.log(rating);
    HistoryAPI.Rating(props.barterId,props.userId,rating)
    .then((res)=>{
      console.log(res);
      props.closeModal();
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (

        <ModalBackground open={props.open} onClick={props.closeModal}>
          <Modalwindow onClick={(e)=>{e.stopPropagation()}}>
            <LocationSvg><p onClick={props.closeModal}>✖</p></LocationSvg>
            <Textwrap></Textwrap>
            <Texttitle>{props.nickcname}님과의 <br></br>교환은 어떠셨나요?</Texttitle>
            <ImageCover>
              <Image size="13" shape="square" src={props.src} vhvw></Image>
            </ImageCover>
            
            <Stars>
              {Array.from({ length: 5 }, (item, idx) => {
                return (
                  <FaStar
                    key={idx}
                    onClick={() => setRating(idx + 1)}
                    style={{ color: rating < idx + 1 ? "grey" : "#ffca39" }}
                  />
                );
              })}
            </Stars>
            <RatingButton onClick={handleSubmit}>평가하기</RatingButton>
          </Modalwindow>
        </ModalBackground>
  );
};
const ModalBackground = styled.div`
    position: absolute;
    z-index: 1999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;
const Modalwindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width:400px
  height: 55vh;
  background: white;
  border-radius:10px;

  // border: 2px solid grey;
  // boxShadow: 24,
  z-index: 2000;
`;
const LocationSvg=styled.div`
  // height:9vh;
  padding:1vh;
  font-size:1.5rem;
  display:flex;
  justify-content: right;
`;
const Textwrap=styled.div`
`;
const Texttitle = styled.p`
  display:block;
  text-align: center;
  font-size:1.2rem;
  font-weight:bold;
  padding:0 6rem;
`;


const Stars = styled.div`
  display: flex;
  padding-top: 5px;
  
  width: 70%;
  margin: 2vh auto;
  justify-content: center;
  // text-align:center;
  // <div style={{width:'70%', display:'flex', margin:'0 auto', justifyContent:'center'}} >

  svg {
    width: 50px;
    height: 50px;
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #ffca39;;
  }

  & svg:hover ~ svg {
    color: gray;
  }
  & svg:hover + svg {
    color: red;
  }

`;

const ImageCover=styled.div`
  padding:10px;
  font-size:5vw;
  display:flex;
  justify-content: center;
`;

const RatingButton = styled.button`
  background-color: #2B9ECF;
  height:10vh;
  width: 100%;
  
  font-weight: bold;
  font-size: 1.2rem;
  color:white;
  
  border-radius: 0 0 10px 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  letter-spacing: -0.67px;
  cursor: pointer;
  
`;

export default RatingModal;
