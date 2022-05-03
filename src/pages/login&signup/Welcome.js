import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Text, Grid, Button } from '../../elements/index';

const Welcome = (props) => {
    return (
        <Container>
            <Grid
                margin="0 0 60px 0"
            >
                <Text 
                    text="항해99님,"
                    size="24px"
                    letterSpacing="-1px"
                    textAlign="center"
                />
                <Text 
                    text="회원가입을 축하합니다!"
                    size="24px"
                    letterSpacing="-1px"
                    textAlign="center"
                />
            </Grid>
            <Round />
            <Grid
                padding="0 16px"
            >
                <StyledLink to="/">시작하기</StyledLink>
            </Grid>
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: #ffca39;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    overflow: hidden;
`;

const Round = styled.div`
    width: 110%;
    height: 50%;
    background-color: white;
    border-radius: 500px;
    transform: rotate(90deg);
    margin: 0 auto;
`;

const StyledLink = styled(Link)`
    display: inline-block;
    text-decoration: none;
    height: 49px;
    width: 100%;
    background: #000000;
    padding: 0px 63px;
    font-size: 18px;
    letter-spacing: -1px;
    color: white;
    text-align: center;
    line-height: 49px;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 18px;
    cursor: pointer;
`;

export default Welcome;