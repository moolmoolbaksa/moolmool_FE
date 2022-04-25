import React from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button } from '../elements/index';

const Login = (props) => {
    return (
        <Grid
            padding="0 16px"
            flex
            is_column
        >
            <Text 
                text="로그인하기"
                textAlign="center"
                size="24px"
            />
            <Input 
                placeholder="이메일"
                padding="10px"
                margin="0 0 10px 0"
            />
            <Input 
                type="password"
                placeholder="비밀번호"
                padding="10px"
                margin="0 0 10px 0"
            />
            <Button 
                text="로그인하기"
                size="18px"
                background="black"
                color="white"
                padding="10px 0"
                radius="3px"
            />

        </Grid>
    );
};

export default Login;