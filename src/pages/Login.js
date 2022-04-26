import React from 'react';
import { Link } from 'react-router-dom';

import { Text, Grid, Input, Button } from '../elements/index';

const Login = (props) => {
    return (
        <Grid
            height="100vh"
            flex
            is_column
        >   
            <Grid>
                <Text 
                    text="로그인하기"
                    textAlign="center"
                    size="24px"
                    lineHeight="200px"
                    flex
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
                    height="50px"
                />
            </Grid>
            <Grid
                flex
                is_column
                height="100px"
                justify="flex-start"
                gap="10px"
            >
                <Text 
                    text="계정이없으시다면?"
                />
                <Link to="/signup">회원가입</Link>
            </Grid>
        </Grid>
    );
};

export default Login;