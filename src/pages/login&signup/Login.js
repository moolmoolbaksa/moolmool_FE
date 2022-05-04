import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Grid } from '../../elements/index';
import Logo from '../../images/logo 1.png';
import { history } from '../../redux/configureStore';

const Login = (props) => {  
    const REDIRECT_URI = `${process.env.REACT_APP_URL}/auth/kakao/callback`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const onGoMain = () => {
        history.push('/');
    };
    
    return (
        <Grid
            height="100%"
            is_flex
            is_column
            gap="155px"
            justify="center"
        >   
            <img 
                src={Logo}
                alt="로고 이미지"
                height="53px"
                width="199px"
                style={{margin: "0 auto"}}
            />
            <Grid
                padding="0 16px"
                is_flex
                is_column
                align="center"
                gap="18px"
            >
                <KakaoBtn href={KAKAO_AUTH_URL}>카카오 간편 로그인/회원가입</KakaoBtn>
                <StyledLink onClick={onGoMain}>로그인없이 둘러보기</StyledLink>
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
    padding: 0px 63px;
    font-size: 18px;
    letter-spacing: -1px;
    color: black;
    text-align: center;
    line-height: 49px;
    border-radius: 5px;
    font-weight: 500;
    cursor: pointer;
`;

export default Login;