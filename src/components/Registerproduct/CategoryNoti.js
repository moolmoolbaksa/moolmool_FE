import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Text, Grid } from '../../elements/index';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height:'500px',
    background:'white',
    border: '2px solid #000',
    // boxShadow: 24,
    zIndex: 2000,

    // p: 4,
  };
const CategoryNoti = (props) => {
    const [isModalOpen,setIsModalOpen]=useState(false);
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

    return (
        <React.Fragment>
            <div>
            <Button height='100px' text='+카테고리 선택하기'>hj</Button>
            
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                        
            >
                <Modalwindow>
                    <h1>gi</h1>
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
width: 300px;
height: 500px;
background: white;
border: 2px solid #000;
// boxShadow: 24,
z-index: 2000;
`;

export default CategoryNoti;