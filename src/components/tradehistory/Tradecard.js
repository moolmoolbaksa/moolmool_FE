import React from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../../elements/index';

const Tradecard = (props) => {
    const {image, title, contents}=props;
    const onGoDetail = () => {
    };

    return (
        <React.Fragment>
            <Cardwrap>

                <Background>
                    <Image shape='square' size='13' src={image} onClick={onGoDetail} padding='20px' vhvw={true}></Image>
                    
                    <Info>
                        <InfoText>
                            <Title>
                                <Titletext>{title}Title</Titletext>                     
                            </Title>
                            
                            <Description>{contents}Content</Description>
                        </InfoText>


                    </Info>
                </Background>
                <Buttonwrap>
                    <Button background='#9D9D9D'  color='white' height='40px' margin='10px 10px 10px 10px' text='교환 취소' ></Button>
                    <Button background='#FFCA39' height='40px' margin='10px 10px 10px 10px' text='교환확정' ></Button>
                </Buttonwrap>
            </Cardwrap>
        </React.Fragment>
        

    );
};

export default Tradecard;



const Titletext=styled.p`
    display:block;
    font-size:1.2rem;
    font-weight:900;
    margin:0px 0px 10px 0px;
`;
const Cardwrap=styled.div`
border-bottom: 1px solid grey;
`;

const Background=styled.div`

display:flex;
background: #FFFFFF;
box-sizing:content-box;
height:15vh;
margin:0px 0px 5px 0px;
`;

const Buttonwrap=styled.div`
    display:flex;
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




