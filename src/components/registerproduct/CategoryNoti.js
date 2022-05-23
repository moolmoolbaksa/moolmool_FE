import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Text, Grid } from '../../elements/index';
import Modal from '@mui/material/Modal';

const CategoryNoti = (props) => {
    const [isModalOpen,setIsModalOpen]=useState(false);
    const setErrorModal=props.setErrorModal;
    const ErrorModal=props.ErrorModal;
    console.log(props);
    const openModal = () => {
        setIsModalOpen(true);
        console.log(isModalOpen);
        // 모달을 열겠다.
      };
    
      const closeModal = () => {
        // setIsModalOpen(false);
        setErrorModal(false);
        //모달이 열렸을 때만 닫아주겠다. 
        console.log(isModalOpen);
      };

    return (
            <div>
            <Modal
                open={ErrorModal}
                onClose={closeModal}
                        
            >
                <Modalwindow>
                
                <LocationSvg><p onClick={closeModal}>✖</p></LocationSvg>
                <Wrap style={{display:'flex'}}>
                <Round>
                    <span className="material-symbols-outlined">
                        priority_high
                    </span>
                </Round>
                
                  <Wrap><Texttitle>{props.message}</Texttitle></Wrap>
                </Wrap>    
                    <RightBtn onClick={closeModal}>확인</RightBtn>
                </Modalwindow>

                
            </Modal>
            </div>
            
    );
};

const LocationSvg=styled.div`
  // height:9vh;
  padding:1.5vh 1.5vh 0 0;
  font-size:1.5rem;
  display:flex;
  justify-content: right;
`;
const Modalwindow = styled.div`

position: relative;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 90vw;
height: 17vh;
max-width:400px;
background: white;
border-radius:2vw;
// border: 2px solid #000;
// boxShadow: 24,
z-index: 2000;
`;
const Wrap=styled.div`
justify-content: center;
align-items: center;
`;
const Texttitle = styled.p`
  display:block;
  text-align: center;
  font-size:1rem;
  font-weight:bold;
  // padding:0 5rem;
  margin:0 0 0 1rem;
`;
const RightBtn = styled.button`
  position:absolute;
  bottom:0;  
  background-color: #2B9ECF;
  height: 5vh;
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  border-radius:0 0 2vw 2vw;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  letter-spacing: -0.67px;
  cursor: pointer;
  
`;
const Round = styled.div` 
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #ffca39;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    & span {
        text-indent: -9999;
        font-size: 30px;
        color: white;
        text-align: center;
    }
`;
export default CategoryNoti;
