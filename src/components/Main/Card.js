import React, { useState } from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../../elements/index';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import IconButton from '@mui/material/IconButton';

const Card = (props) => {
    const [ heartClick, setHeartClick ] = useState(false);
    // const btnRef = useRef();
    
        

    return (
        <React.Fragment>
            <Background>
                <Image shape='rectangle' size='98'></Image>
                
                <Info>
                    <Title>
                        <Titletext>Title</Titletext>
                        {/* <BookmarkBorderOutlinedIcon/> */}
                        <IconButton size='small' aria-label='hearts' >
                            <BookmarkBorderOutlinedIcon/>
                        </IconButton>
                        
                        

                    </Title>
                    
                    <Author>Author</Author>
                    <Description>설명설명</Description>
                    <div style={{display:'flex'}}>
                        <IconButton size='small' aria-label='hearts' color='primary'>
                            <FavoriteBorderOutlinedIcon/>  1234
                        </IconButton>
                        
                        
                        <IconButton size='small' aria-label='hearts' color='primary'>
                            <ChatBubbleOutlineOutlinedIcon/> 9303
                        </IconButton>
                        <IconButton size='small' aria-label='hearts' color='primary'>
                            <LocationOnOutlinedIcon/> 7303
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
height:100px;
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




