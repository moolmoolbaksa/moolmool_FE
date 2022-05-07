import React, { useState } from 'react';
import styled from 'styled-components';

import {Image } from '../../elements/index';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {BsEye} from 'react-icons/bs'

import IconButton from '@mui/material/IconButton';
import { api as productActions } from '../../redux/modules/product';
import { useDispatch } from 'react-redux';
import Image2 from '../../elements/Image2';

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
                <Image2 shape='square' size='15' src={image} onClick={onGoDetail} padding='20px'></Image2>
                
                <Info>
                    <Title>
                        <Titletext>{title}</Titletext>                     
                    </Title>
                    
                    <Description>{contents}</Description>
                    <div style={{display:'flex'}}>

                            <FavoriteBorderOutlinedIcon/>{scrabCnt}
                            <BsEye/> {viewCnt}
                            <LocationOnOutlinedIcon/> {address}
                     </div>
                </Info>
                
                
                


                
                
                    

            </Background>
        </React.Fragment>
        
        
        

    );
};

export default Card;
const Titletext=styled.p`
    display:block;
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
font-size: 9px;
// line-height: 25px;
/* or 156% */`;




