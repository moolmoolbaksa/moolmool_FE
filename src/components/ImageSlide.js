import React from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../elements/index';
import { BsTrash } from "react-icons/bs";
const ImageSlide = (props) => {
    const {_onclick}=props;
    
    return (
        <DeleteOuter>
            <DeleteButton onClick={_onclick}><BsTrash/></DeleteButton>
            <Image shape="square" size="50" src={props.src} margin="10px"></Image>
            
        </DeleteOuter>
        

    );
};
const DeleteOuter=styled.div`
    position:relative;
`;
const DeleteButton=styled.button`
    display:block;    
    position:absolute;
    width:20px;
    height:20px;
    border-radius:10px;
    border:2px solid blue;
    left:40px;
    bottom:40px;
    
    
`
export default ImageSlide;