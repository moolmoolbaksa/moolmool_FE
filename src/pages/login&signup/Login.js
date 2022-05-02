import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Text, Grid, Input, Button } from '../../elements/index';
import { api as userApi } from '../../redux/modules/user';

const Login = (props) => {
    const dispatch = useDispatch();
    
    const REDIRECT_URI = `${process.env.REACT_APP_URL}/auth/kakao/callback`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const [formLogin, setFormLogin] = useState({
        username: '',
        password: '',
    });

    const {username, password} = formLogin;

    const onChange = (e) => {
        const {id, value} = e.target;

        setFormLogin({
            ...formLogin,
            [id]: value,
        });
    };

    const clickLogin = () => {
        dispatch(userApi.loginApi(formLogin));
    };
    
    return (
        <Grid
            height="100vh"
            is_flex
            is_column
            justify="space-between"
            padding="0 16px"
        >   
            <Grid>
                <Text 
                    text="로그인"
                    textAlign="center"
                    size="24px"
                    bold="bold"
                    lineHeight="250px"
                    flex
                />
                <Input
                    onChange={onChange} 
                    id="username"
                    placeholder="이메일"
                    padding="10px"
                    margin="0 0 10px 0"
                    height="50px"
                />
                <Input 
                    onChange={onChange} 
                    id="password"
                    type="password"
                    placeholder="비밀번호"
                    padding="10px"
                    margin="0 0 30px 0"
                    height="50px"
                />
                <Button 
                    onClick={clickLogin}
                    text="로그인하기"
                    size="18px"
                    background="black"
                    color="white"
                    padding="10px 0"
                    radius="3px"
                    height="50px"
                />
                <KakaoBtn href={KAKAO_AUTH_URL}>카카오로그인하기</KakaoBtn>
            </Grid>
            <Grid
                flex
                is_column
                height="100%"
                justify="center"
                gap="15px"
            >
                <Text 
                    text="계정이없으시다면?"
                    bold="bold"
                    textAlign="center"
                />
                <StyledLink to="/signup">회원가입</StyledLink>
            </Grid>
        </Grid>
    );
};

const StyledLink = styled(Link)`
    /* text-decoration: none; */
    color: black;
`

const KakaoBtn = styled.a`

`;
export default Login;