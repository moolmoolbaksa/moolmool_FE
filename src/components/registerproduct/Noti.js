import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Grid,Button } from '../../elements/index';
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
            <div style={{position:'relative' ,display: 'flex', height:'10px', background: '#F5F5F5', justifyContent:'center'}}>
                {/* <Button size='0.8rem' deco='underline' color='#979797' onClick={openModal}></Button> */}
                <Empty/>
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                        
            >
                <Modalwindow>
                    <h1>주의사항</h1>
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
const Empty=styled.div`
    width:100%;
    background-color:#F5F5F5;
    height:10px;
`

export default Noti;
