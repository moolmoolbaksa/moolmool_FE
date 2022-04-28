import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';

import { Text, Grid, Input, Button } from '../elements/index';
import axios from 'axios';
import { isPassword, isUsername } from '../shared/regExp';
import { api as userApi } from '../redux/modules/user';

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
    const [checkPW, setCheckPW] = useState(true);
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
            setCheckPW(true);
            return;
        }
        if(!isPassword(password)){
            setCheckPW(false);
        } else {
            setCheckPW(true);
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
                dispatch(usernameCheckApi(value));
            } else {
                dispatch(nicknameCheckApi(value));
            }
        }, 500)
    ,[]);

    const usernameCheckApi = (username) => {
        return async function () {
            try {
                const response = await axios.post('http://13.124.0.71/user/id-check', {username});
                setCheckDupID(response.data.ok);
                console.log("이메일 중복 여부: ", response.data.ok)
            } catch (error) {
                console.log(error);
            }
        }
    };
    
    const nicknameCheckApi = (nickname) => {
        return async () => {
            try {
                const response = await axios.post('http://13.124.0.71/user/nickname-check', {nickname});
                setCheckDupNick(response.data.ok);
                console.log("닉네임 중복 여부: ",response.data.ok)
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(!username || !nickname || !password || !passwordCheck){
            alert("빈칸을 모두 채워주세요.");
            return;
        }
        if(!checkID){
            alert("이메일 형식이 올바르지 않습니다.");
            return;
        }
        if(!checkPW){
            alert("비밀번호 형식이 올바르지 않습니다.");
            return;
        }
        if(!checkDupID){
            alert("이미 사용 중인 이메일입니다.");
            return;
        }
        if(!checkDupNick){
            alert("이미 사용 중인 닉네임입니다.");
            return;
        }
        if(!isRight){
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }
        dispatch(userApi.signupApi(formRegister));
    };

    return (
        <Grid
            height="100vh"
            is_flex
            is_column
            justify="center"
            padding="0 16px"
        >   
            <Grid>
                <Text 
                    text="회원가입"
                    textAlign="center"
                    size="24px"
                    lineHeight="150px"
                    letterSpacing="-0.6px"
                    bold="bold"
                    flex
                />
                <Input 
                    onChange={onChangeFormRegister}
                    id="username"
                    placeholder="이메일"
                    padding="10px"
                    margin="0 0 30px 0"
                    height="50px"
                    text={checkDupID ? (checkID ? '' : '올바른 이메일 형식을 입력해주세요.') : "이미 사용 중인 이메일입니다"}
                />
                <Input 
                    onChange={onChangeFormRegister}
                    id="nickname"
                    placeholder="닉네임"
                    padding="10px"
                    margin="0 0 30px 0"
                    height="50px"
                    text={checkDupNick ? "" : "이미 사용 중인 닉네임입니다"}
                />
                <Input 
                    onChange={onChangeFormRegister}
                    id="password"
                    type="password"
                    placeholder="비밀번호"
                    padding="10px"
                    margin="0 0 30px 0"
                    height="50px"
                    text={checkPW ? '' : '8~20자로 영문 대소문자, 숫자, 특수문자 조합을 사용하세요.'}
                />
                <Input 
                    onChange={onChangeFormRegister}
                    id="passwordCheck"
                    type="password"
                    placeholder="비밀번호확인"
                    padding="10px"
                    margin="0 0 30px 0"
                    height="50px"
                    text={isRight ? '' : '비밀번호가 일치하지 않습니다.'}
                />
            </Grid>
            <Grid flex height="200px">
                <Button 
                    onClick={onSubmit}
                    text="회원가입"
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