import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Grid } from '../../elements/index';
import { persistor } from '../../index';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from '../../shared/socialOAuth';

const Login = (props) => {
    
    useEffect(() => {
        localStorage.clear();
        persistor.purge();
    }, []);

    return (
        <Grid height="100%" is_column justify="center" gap="50px">
            <Wrap>
                <Logo 
                    src={require('../../images/brand_name.png')}
                    alt="물물박사 로고"
                    width="60%"
                />
            </Wrap>
            <Grid padding="0 16px" is_column margin="0 0 30px" align="center" gap="8px">
                {/* <A href={NAVER_AUTH_URL}>
                    네이버로 시작하기
                    <LoginBtn 
                        src={require("../../images/naverLogo.png")} 
                        alt='네이버 로그인'
                        width="20px"
                        height="20px"
                        style={{padding: '0 0 0 4px'}}
                    />
                </A> */}
                <A href={KAKAO_AUTH_URL} login>
                    카카오로 시작하기
                    <LoginBtn 
                        src={require("../../images/kakaoLogo.png")} 
                        alt='카카오로그인'
                        width="30px"
                        height="30px"
                    />
                </A>
                <StyledLink to="/">로그인없이 둘러보기</StyledLink> 
            </Grid>
        </Grid>
    );
};

const StyledLink = styled(Link)`
    color: black;
    border-bottom: 1px solid #000;
    text-decoration: none;
    font-size: 14px;
    letter-spacing: -1px;
    margin-top: 10px;
    color: black;
    cursor: pointer;
`;

const Wrap = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;  
`;

const A = styled.a`
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    height: 50px;
    width: 100%;
    background: ${props => props.login ? '#FEE500' : '#03c75a'};
    color: ${props => props.login ? '#000000' : 'white'};
    letter-spacing: -.22px;
    font-size: 16px;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
`;

const LoginBtn = styled.img`
    position: absolute;
    left: 5%;
`;

const Logo = styled.img`
    margin: 0 auto;
`;

export default Login;
