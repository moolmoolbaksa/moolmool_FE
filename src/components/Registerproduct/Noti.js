import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Grid } from '../../elements/index';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
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
const Noti = (props) => {
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
            <div style={{position:'relative' ,display: 'flex', height:'50px', background: '#F5F5F5', justifyContent:'flex-end'}}>
                <Button onClick={openModal}>물물교환 전 확인해 주세요!</Button>
            
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

export default Noti;