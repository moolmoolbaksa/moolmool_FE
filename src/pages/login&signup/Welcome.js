import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Text, Grid, Button } from '../../elements/index';
import { ReactComponent as WelcomeBackground} from '../../images/최초로그인환영.svg';

const Welcome = (props) => {
    const nickname = useSelector(state => state.user.user_info.nickname);

    return (
        <Container>
            <StyledComponent/>
            <Grid
                position="absolute"
                height="80%"
                width="100%"
                is_flex
                is_column
                justify="space-between"
            >   
                <Grid
                    margin="50px 0 0"
                >
                    <Text 
                        text={`${nickname}님,`}
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
                <Grid
                    padding="0 16px"
                >
                    <StyledLink to="/">시작하기</StyledLink>
                </Grid>
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

const StyledComponent = styled(WelcomeBackground)`
    position: absolute;
`

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
    /* padding: 0px 63px; */
    font-size: 18px;
    letter-spacing: -1px;
    color: white;
    text-align: center;
    line-height: 49px;
    border-radius: 5px;
    font-weight: bold;
    /* margin-top: 18px; */
    cursor: pointer;
`;

export default Welcome;