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

const Card = (props) => {
    const dispatch = useDispatch();
    const [ heartClick, setHeartClick ] = useState(false);
    // const btnRef = useRef();
    const {itemId, image, address, title, contents, scrab, scrabCnt, viewCnt}=props;
    
    const onGoDetail = () => {
        dispatch(productActions.getProductApi(itemId));
    };

    return (
        <React.Fragment>
            <Background>
                <Image shape='rectangle' size='150' src={image} onClick={onGoDetail} padding='20px'></Image>
                
                <Info>
                    <Title>
                        <Titletext>{title}</Titletext>                     
                    </Title>
                    
                    <Description>{contents}</Description>
                    <div style={{display:'flex'}}>
                        <IconButton size='small' aria-label='hearts' color='primary'>
                            <FavoriteBorderOutlinedIcon/>{scrabCnt}
                        </IconButton>
                        
                        
                        <IconButton size='small' aria-label='hearts' color='primary'>
                            <BsEye/> {viewCnt}
                        </IconButton>
                        <IconButton size='small' aria-label='hearts' color='primary'>
                            <LocationOnOutlinedIcon/> {address}
                        </IconButton>
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

border-radius: 5px;
height:150px;
border:1px solid black;
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
// line-height: 25px;`;
const Author=styled.div`
display:block;

/* Open Sans / 16 sp • Body 2 */
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 11px;
// line-height: 25px;`;
const Description=styled.h2`

/* Open Sans / 16 sp • Body 2 */
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 9px;
// line-height: 25px;
/* or 156% */`;




