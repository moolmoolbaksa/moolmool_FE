import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Grid } from '../../elements/index';
import { ReactComponent as LogoIcon } from '../../images/로고.svg';
import kakao from '../../images/카카오심볼.png';
import { persistor } from '../../index';

const Login = (props) => {
    const REDIRECT_URI = `${process.env.REACT_APP_URL}/auth/kakao/callback`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    useEffect(() => {
        localStorage.clear();
        persistor.purge();
    }, []);

    return (
        <Grid height="100%" is_flex is_column justify="center" gap="50px">
            <Wrap>
                <span>똑똑한 교환 생활</span>
                <StyledLogo />
            </Wrap>
            <Grid padding="0 16px" is_flex is_column margin="0 0 30px" align="center" gap="12px">
                <KakaoBtn href={KAKAO_AUTH_URL}>
                    카카오로 시작하기
                    <KakaoSymbol src={kakao} alt=''/>
                </KakaoBtn>
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
    & span {
        font-family: 'Jua', sans-serif;
        color: #FFD467;
        font-size: 20px;
        margin-bottom: 5px;
    }   
`;

const KakaoBtn = styled.a`
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    height: 50px;
    width: 100%;
    background: #FEE500;
    font-size: 15px;
    letter-spacing: -1px;
    color: #000000;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
`;

const KakaoSymbol = styled.img`
    position: absolute;
    height: 30px;
    left: 5%;
`;

const StyledLogo = styled(LogoIcon)`
    margin: 0 auto;
`;

export default Login;
