import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { Text, Grid, Input, Button } from '../../elements/index';
import axios from 'axios';
import { isPassword, isUsername } from '../../shared/regExp';
import { api as userApi } from '../../redux/modules/user';

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
                console.log("????????? ?????? ??????: ", response.data.ok)
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
                console.log("????????? ?????? ??????: ",response.data.ok)
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(!username || !nickname || !password || !passwordCheck){
            alert("????????? ?????? ???????????????.");
            return;
        }
        if(!checkID){
            alert("????????? ????????? ???????????? ????????????.");
            return;
        }
        if(!checkPW){
            alert("???????????? ????????? ???????????? ????????????.");
            return;
        }
        if(!checkDupID){
            alert("?????? ?????? ?????? ??????????????????.");
            return;
        }
        if(!checkDupNick){
            alert("?????? ?????? ?????? ??????????????????.");
            return;
        }
        if(!isRight){
            alert("??????????????? ???????????? ????????????.")
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
                    text="????????????"
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
                    placeholder="?????????"
                    padding="10px"
                    margin="0 0 30px 0"
                    height="50px"
                    text={checkDupID ? (checkID ? '' : '????????? ????????? ????????? ??????????????????.') : "?????? ?????? ?????? ??????????????????"}
                />
                <Input 
                    onChange={onChangeFormRegister}
                    id="nickname"
                    placeholder="?????????"
                    padding="10px"
                    margin="0 0 30px 0"
                    height="50px"
                    text={checkDupNick ? "" : "?????? ?????? ?????? ??????????????????"}
                />
                <Input 
                    onChange={onChangeFormRegister}
                    id="password"
                    type="password"
                    placeholder="????????????"
                    padding="10px"
                    margin="0 0 30px 0"
                    height="50px"
                    text={checkPW ? '' : '8~20?????? ?????? ????????????, ??????, ???????????? ????????? ???????????????.'}
                />
                <Input 
                    onChange={onChangeFormRegister}
                    id="passwordCheck"
                    type="password"
                    placeholder="??????????????????"
                    padding="10px"
                    margin="0 0 30px 0"
                    height="50px"
                    text={isRight ? '' : '??????????????? ???????????? ????????????.'}
                />
            </Grid>
            <Grid flex height="200px">
                <Button 
                    onClick={onSubmit}
                    text="????????????"
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