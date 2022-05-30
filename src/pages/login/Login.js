import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Grid } from '../../elements/index';
import { persistor } from '../../index';
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from '../../shared/socialOAuth';

const Login = (props) => {
    
    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
        persistor.purge();
    }, []);

    return (
        <Grid height="100%" is_column justify="center" gap="50px" >
            <Wrap>
                <Logo 
                    src={require('../../images/brand_name.png')}
                    alt="물물박사 로고"
                    width="60%"
                />
            </Wrap>
            <Grid padding="0 16px" is_column margin="0 0 30px" align="center" gap="8px">
                <A href={GOOGLE_AUTH_URL}>
                    <GoogleIcon viewBox="0 0 40 40" fill="none">
                        <path
                            d="M32.5 20.3001C32.5 19.4223 32.423 18.5889 32.291 17.7778H19.8638V22.7889H26.9792C26.6603 24.4334 25.7255 25.8223 24.3398 26.7667V30.1001H28.5849C31.0703 27.7778 32.5 24.3556 32.5 20.3001Z"
                            fill="#458AFF"
                        />
                        <path
                            d="M19.8634 33.3333C23.4266 33.3333 26.4069 32.1333 28.5845 30.1L24.3394 26.7667C23.1517 27.5667 21.645 28.0555 19.8634 28.0555C16.4211 28.0555 13.5068 25.7111 12.462 22.5444H8.08496V25.9778C10.2515 30.3333 14.7055 33.3333 19.8634 33.3333Z"
                            fill="#34A853"
                        />
                        <path
                            d="M12.4622 22.5444C12.1873 21.7444 12.0443 20.8889 12.0443 20C12.0443 19.1111 12.1983 18.2556 12.4622 17.4556V14.0222H8.08519C7.18339 15.8222 6.6665 17.8444 6.6665 20C6.6665 22.1556 7.18339 24.1778 8.08519 25.9778L12.4622 22.5444Z"
                            fill="#FCBC05"
                        />
                        <path
                            d="M19.8634 11.9445C21.8099 11.9445 23.5476 12.6223 24.9223 13.9445L28.6834 10.1445C26.4069 7.98897 23.4266 6.66675 19.8634 6.66675C14.7055 6.66675 10.2515 9.66675 8.08496 14.0223L12.462 17.4556C13.5068 14.289 16.4211 11.9445 19.8634 11.9445Z"
                            fill="#EA4335"
                        />
                    </GoogleIcon>
                    구글로 시작하기
                </A>
                <A href={KAKAO_AUTH_URL} login>
                    카카오로 시작하기
                    <KakaoIcon 
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
    letter-spacing: -.22px;
    font-size: 16px;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    background: ${props => props.login ? '#FEE500' : '#FFFFFF'};
    color: ${props => props.login ? '#000000' : 'rgb(0, 0, 0)'};
    border: ${props => props.login ? 'none' : '1px black solid'};
`;

const GoogleIcon = styled.svg`
    position: absolute;
    width: 40px;
    height: 40px;
    left: 3.5%;
    background-color: white;
`;

const KakaoIcon = styled.img`
    position: absolute;
    left: 5%;
`;

const Logo = styled.img`
    margin: 0 auto;
`;

export default Login;
