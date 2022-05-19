import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import { FaStar } from "react-icons/fa";
import {Image} from "../../elements/index";
import { useDispatch} from 'react-redux';
import { HistoryAPI, } from '../../shared/api';

import { rateTrade,acceptTrade} from '../../redux/modules/tradehistory'
const RatingModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const dispatch=useDispatch();
  const openModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
    // 모달을 열겠다.
  };

  const closeModal = () => {
    setIsModalOpen(false);
    //모달이 열렸을 때만 닫아주겠다.
    console.log(isModalOpen);
  };
  const handleSubmit=()=>{
    dispatch(rateTrade({barterId:props.barterId,myPosition:props.myPosition}));
    dispatch(acceptTrade({barterId:props.barterId,myPosition:props.myPosition}));
    console.log(rating);
    HistoryAPI.Rating(props.barterId,props.userId,rating)
    .then((res)=>{
      console.log(res); 
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <React.Fragment>
      <div
        style={{
          width:"100%",
          position: "relative",
          display: "flex",
          height: "50px",
          background: "#F5F5F5",
          justifyContent: "center",
        }}
      >
        <RightBtn onClick={openModal}>평가하기</RightBtn>

        <Modal open={isModalOpen} onClose={closeModal}>
          <Modalwindow>
            <LocationSvg><p onClick={closeModal}>✖</p></LocationSvg>
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
        </Modal>
      </div>
    </React.Fragment>
  );
};

const Modalwindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  height: 55vh;
  background: white;
  border-radius:5vw;

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
const RightBtn = styled.button`
  background-color: #ffca39;
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
  letter-spacing: -0.67px;
  cursor: pointer;
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
  // .yellowStar {
  //   color: #fcc419;
  // }
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
  
  border-radius: 0 0 5vw 5vw;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  letter-spacing: -0.67px;
  cursor: pointer;
  
`;

export default RatingModal;
