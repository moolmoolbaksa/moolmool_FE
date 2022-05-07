import React from 'react';
import styled from 'styled-components';

import { Grid, Text } from '../../elements/index';

const TradeItemCard = ({sellerImages, sellerNickName}) => {
    console.log(sellerImages)
    return (
        <Container>
            <ImageOutter>
                <ImageWrap src={sellerImages}/>
            </ImageOutter>
            <Grid
                is_flex
                is_column
                gap="10px"
                is_overflow
            >
                <Grid
                    is_flex
                    is_column
                    gap="5px"
                    is_overflow
                >
                    <Text 
                        text={sellerNickName}
                    />
                    <Text 
                        text='3개월 남은 샐러드'
                    />
                </Grid>
            <Text 
                    text='content자리'
                />    
            </Grid>
        </Container>
    )
};

const Container = styled.div`
    margin: 16px 0;
    /* border: 1px red solid; */
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 15px;
`;

const ImageOutter = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: calc(10 / 10 * 100%);
    /* border: 1px blue solid; */
`;

const ImageWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
	height: 100%;
    /* border-radius: 5px; */
    background: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

export default TradeItemCard;