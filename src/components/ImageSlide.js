import React from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../elements/index';

const ImageSlide = (props) => {
    const {_onclick}=props;
    
    return (

            <DeleteOuter>
                <Image vhvw shape="square" size="6" src={props.src} margin="10px"></Image>
                <DeleteButton onClick={_onclick}><p>✖</p></DeleteButton>
            </DeleteOuter>

        

    );
};
const DeleteOuter=styled.div`
    position:relative;
    margin:0 10px;
`;
const DeleteButton=styled.button`
    display:block;    
    position:absolute;
    width:1rem;
    height:1rem;
    border-radius:1rem;
    right:0;
    top:0;
    background:black;
    font-size:0;
    & > p{
        display:block;
        color:white;
        font-size:0.5rem;
        text-align:center;
        margin: -0.1rem 0;
    }
    
`
export default ImageSlide;