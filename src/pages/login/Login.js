import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Grid } from '../../elements/index';
import { ReactComponent as LogoIcon } from '../../images/로고.svg';

const Login = props => {
    const REDIRECT_URI = `${process.env.REACT_APP_URL}/auth/kakao/callback`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <Grid height="100%" is_flex is_column gap="155px" justify="center">
            <StyledLogo />
            <Grid padding="0 16px" is_flex is_column align="center" gap="18px">
                <KakaoBtn href={KAKAO_AUTH_URL}>카카오 간편 로그인/회원가입</KakaoBtn>
                <StyledLink to="/">로그인없이 둘러보기</StyledLink>
            </Grid>
        </Grid>
    );
};

const StyledLink = styled(Link)`
    color: black;
    border-bottom: 1px solid #000;
    text-decoration: none;
    letter-spacing: -1px;
    color: black;
    cursor: pointer;
`;

const KakaoBtn = styled.a`
    display: inline-block;
    text-decoration: none;
    height: 49px;
    width: 100%;
    background: #ffca39;
    font-size: 18px;
    letter-spacing: -1px;
    color: black;
    text-align: center;
    line-height: 49px;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
`;

const StyledLogo = styled(LogoIcon)`
    margin: 0 auto;
`;

export default Login;
