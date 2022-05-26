import React from 'react';
import styled from 'styled-components';
import { ReactComponent as deleteBlackround } from '../images/delete_blackround.svg';
import { Text, Grid, Input, Button,Image } from '../elements/index';

const ImageSlide = (props) => {
    const {_onclick}=props;
    
    return (

            <DeleteOuter>
                <Image vhvw shape="square" size="6" src={props.src} margin="10px"></Image>
                <DeleteIcon width="25" height="25" onClick={_onclick}></DeleteIcon>
            </DeleteOuter>

        

    );
};
{/* <CheckBox width="1rem" height="1rem"/>:<UncheckedBox width="1rem" height="1rem"/>} */}
const DeleteOuter=styled.div`

    position:relative;
    margin:0 0 0 16px;

`;
const DeleteIcon=styled(deleteBlackround)`
  display:block;    
  position:absolute;
  right:0;
  top:0;
`

// const DeleteButton=styled.button`
//     display:block;    
//     position:absolute;
//     width:1rem;
//     height:1rem;
//     border-radius:1rem;
//     right:0;
//     top:0;
//     background:black;
//     font-size:0;
//     & > p{
//         display:block;
//         color:white;
//         font-size:0.5rem;
//         text-align:center;
//         margin: -0.1rem 0;
//     }
    
// `
export default ImageSlide;