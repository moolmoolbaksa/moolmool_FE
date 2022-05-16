import React from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../elements/index';
import { BsTrash } from "react-icons/bs";
const ImageSlide = (props) => {
    const {_onclick}=props;
    
    return (
        <DeleteOuter>
            
            <Image vhvw shape="square" size="6" src={props.src} margin="10px"></Image>
            <DeleteButton onClick={_onclick}><BsTrash/></DeleteButton>
            </DeleteOuter>


    );
};
const DeleteOuter=styled.div`
    position:relative;
    
`;
const DeleteButton=styled.button`
    display:block;    
    position:absolute;
    width:25px;
    height:25px;
    border-radius:25px;
    border:2px solid blue;
    align-items:center;
    right:0;
    top:0;
    
    
    
`
export default ImageSlide;