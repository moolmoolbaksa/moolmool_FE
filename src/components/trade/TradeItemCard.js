import React from 'react';
import styled from 'styled-components';

import { Grid, Text } from '../../elements/index';

const TradeItemCard = ({nickname, degree, title, contents, image}) => {
    return (
        <Container>
            <ImageOutter>
                <ImageWrap src={image}/>
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
                    <Grid
                        is_flex
                        align="center"
                        gap="10px"
                    >
                        <Text 
                            text={`${nickname}님`}
                            width= "max-content"
                            color="#9D9D9D"
                        />
                        <span>
                            {degree}
                        </span>
                    </Grid>
                    <Text 
                        text={title}
                        size="20px"
                        bold="bold"
                    />
                </Grid>
                <Text 
                    multi="2"
                    text={contents}
                    color="#9D9D9D"
                /> 
            </Grid>
        </Container>
    )
};

const Container = styled.div`
    padding: 20px 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 15px;
    border-bottom: 1px #c4c4c4 solid;

    & span {
        position: relative;
        color: #9d9d9d;
        font-size: 14px;
        line-height: 18px;
    }

    & span:before {
        content: "";
        position: absolute;
        left: -5px;
        top: 4px;
        width: 1px;
        height: 11px;
        background-color: #9D9D9D;
    }
`;

const ImageOutter = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: calc(10 / 10 * 100%);
`;

const ImageWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
	height: 100%;
    background: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

const TwoLine = styled.div`
    word-wrap:break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
`

export default TradeItemCard;