import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';

import { Text, Grid, Input, Button } from '../elements/index';
import axios from 'axios';
import { isPassword, isUsername } from '../shared/regExp';
import { signUp } from '../redux/modules/user';

const Signup = (props) => {
    const dispatch = useDispatch();

    const [formRegister, setFormRegister] = useState({
        username: "",
        nickname: "",
        password: "",
        passwordCheck: "",
    });

    const { username, nickname, password, passwordCheck } = formRegister;
    
    const [checkDupID, setCheckDupID] = useState(true);
    const [checkDupNick, setCheckDupNick] = useState(true);
    const [checkID, setCheckID] = useState(true);
    const [_checkPassword, setCheckPassword] = useState(true);
    const [isRight, setIsRight] = useState(true);


    const onChangeFormRegister = (e) => {
        const {id, value} = e.target;

        setFormRegister({
            ...formRegister,
            [id]: value,
        });

        if(id === "username" || "nickname") checkDup(id, value);  
    };
   
    useEffect(() => {
        if(username === ""){
            setCheckID(true);
            return;
        }
        if(!isUsername(username)){
            setCheckID(false);
        } else {
            setCheckID(true);
        }
    }, [username]);

    useEffect(() => {
        if(password === ""){
            setCheckPassword(true);
            return;
        }
        if(!isPassword(password)){
            setCheckPassword(false);
        } else {
            setCheckPassword(true);
        }
    }, [password]);
    
    useEffect(() => {
        if(passwordCheck === ""){
            setIsRight(true);
            return;
        }
        if(password !== passwordCheck){
            setIsRight(false);
        } else {
            setIsRight(true);
        }
    }, [passwordCheck, password]);

    const checkDup = useCallback( 
        _.debounce((id, value) => {
            if(id === "username"){
                usernameCheckApi(value);
            } else {
                nicknameCheckApi(value);
            }
        }, 500)
    ,[]);

    const usernameCheckApi = (username) => {
        return async () => {
            try {
                const response = await axios.post('/user/id-check', {username});
                if(!response.data) setCheckDupID(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const nicknameCheckApi = (nickname) => {
        return async () => {
            try {
                const response = await axios.post('/user/nickname-check', {nickname});
                if(!response.data) setCheckDupNick(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (!username || !nickname || !password || !passwordCheck) {
            alert("빈칸을 모두 채워주세요.");
            return;
        }
        dispatch(signUp(formRegister));
    };

    return (
        <Grid
            height="100vh"
            is_flex
            is_column
            justify="space-between"
        >   
            <Grid>
                <Text 
                    text="회원가입하기"
                    textAlign="center"
                    size="24px"
                    lineHeight="200px"
                    flex
                />
                <Input 
                    onChange={onChangeFormRegister}
                    id="username"
                    placeholder="이메일"
                    padding="10px"
                    margin="0 0 10px 0"
                    text={checkDupID ? (checkID ? '' : '이메일 형식이 올바르지 않습니다') : "이미 사용 중인 이메일입니다"}
                />
                <Input 
                    onChange={onChangeFormRegister}
                    id="nickname"
                    placeholder="닉네임"
                    padding="10px"
                    margin="0 0 10px 0"
                    text={checkDupNick ? "" : "이미 사용 중인 닉네임입니다"}
                />
                <Input 
                    onChange={onChangeFormRegister}
                    id="password"
                    type="password"
                    placeholder="비밀번호"
                    padding="10px"
                    margin="0 0 10px 0"
                    text={_checkPassword ? '' : '비밀번호 형식이 올바르지 않습니다'}
                />
                <Input 
                    onChange={onChangeFormRegister}
                    id="passwordCheck"
                    type="password"
                    placeholder="비밀번호확인"
                    padding="10px"
                    margin="0 0 10px 0"
                    text={isRight ? '' : '비밀번호가 일치하지 않습니다.'}
                />
            </Grid>
            <Grid flex height="300px">
                <Button 
                    onClick={onSubmit}
                    text="회원가입하기"
                    size="18px"
                    background="black"
                    color="white"
                    padding="10px 0"
                    radius="3px"
                    height="50px"
                />    
            </Grid>
        </Grid>
    );
};

export default Signup;