import React, { useState } from 'react';
import styled from 'styled-components';

import {Image } from '../../elements/index';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import IconButton from '@mui/material/IconButton';
import { api as productActions } from '../../redux/modules/product';
import { useDispatch } from 'react-redux';
import Image2 from '../../elements/Image2';;

const Card = (props) => {
    const dispatch = useDispatch();
    // const btnRef = useRef();
    const {itemId, image, address, title, contents, scrab, scrabCnt, viewCnt}=props;
    
    const onGoDetail = () => {
        dispatch(productActions.getProductApi(itemId));
    };

    return (
        <React.Fragment>
            <Background>
                <Image shape='square' size='13' src={image} onClick={onGoDetail} padding='20px' vhvw={true}></Image>
                
                <Info>
                    <InfoText>
                        <Title>
                            <Titletext>{title}</Titletext>                     
                        </Title>
                        
                        <Description>{contents}</Description>
                    </InfoText>
                    <div style={{display:'flex',justifyContent:'flex-end', alignContent:'flex-end', margin:'0px 10px 0px 0px'}}>

                            <FavoriteBorderOutlinedIcon sx={{color:'red'}}/>{scrabCnt} &nbsp;
                            <VisibilityOutlinedIcon sx={{color:'blue'}}/> {viewCnt} &nbsp;
                            <LocationOnOutlinedIcon sx={{color:'red'}}/> {address}
                     </div>
                </Info>
                
                
                


                
                
                    

            </Background>
        </React.Fragment>
        
        
        

    );
};

export default Card;
const Titletext=styled.p`
    display:block;
    font-size:1.2rem;
    font-weight:900;
    margin:0px 0px 10px 0px;
`;


const Background=styled.div`

display:flex;
background: #FFFFFF;
box-sizing:content-box;
height:15vh;
border-bottom: 1px solid grey;
margin:0px 0px 5px 0px;
`;



const Info=styled.div`
width: 100%;
height: 20%;
margin:0px 0px 0px 1vh;
`;

const InfoText=styled.div`
    height:12vh;
    padding:10px;
`;

const Title=styled.div`
// position: absolute;
display:flex;
font-family: 'DM Serif Display';
font-style: normal;
font-weight: 400;
font-size: 12px;
& ::before{
    content:'  ';
}
// line-height: 25px;`;

const Description=styled.h2`

/* Open Sans / 16 sp • Body 2 */
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 0.8rem;
// line-height: 25px;
/* or 156% */`;




