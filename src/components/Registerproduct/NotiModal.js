import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "../../elements";


  
const NotiModal = (props) => {
    console.log(props);
    return (
        <React.Fragment>
            <ModalPage>
                
                <h1>1</h1>
                <h2>asd</h2>
                
                <h1>2</h1>
                <h2>qwe</h2>

                
                <h1>3</h1>
                <h2>zxc</h2>

                <Button text='확인' background='black' height='30px' color='white' onClick={props.closeModal} />
                    
            </ModalPage>
               
        </React.Fragment>
    );
}


export default NotiModal;

const ModalPage=styled.div`
    position:absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    // height:300px;
    background : white;
    border-radius:10px;
    border: 2px solid black;
    
`;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height:'500px',
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    paddingright:'0px !important',
    p: 4,
  };