import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../redux/configureStore';
import { setLoginModal } from '../../redux/modules/modal';
import { Text, Grid } from '../../elements/index';
import { useLocation } from 'react-router-dom';

const LoginModal = ({type}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const is_login_modal = useSelector(state => state.modal.is_login_modal);
    
    useEffect(() => {
        let timeout;
        if(is_login_modal){
            setIsOpen(true);
        } else {
            timeout = setTimeout(() => setIsOpen(false), 200);
        };
        return () => clearTimeout(timeout);
    }, [is_login_modal]);

    if(!isOpen){
        return null;
    };
    
    const onClose = () => {
        dispatch(setLoginModal(false));
        if(location.pathname==='/trade') history.push('/');
    };

    const onLogin = () => {
        dispatch(setLoginModal(false));
        history.push('/login');
    }
    return (
        <ModalBackground>
            <ModalContainer is_modal={is_login_modal}>
                <Content>
                    <span className="material-symbols-outlined">
                        login
                    </span>
                    <Grid>
                        <Text
                            text="로그인 후 이용가능합니다"
                            textAlign="center"
                            size="24px"
                        />
                    </Grid>
                </Content>
                <BtnWrap>
                    <Button 
                        onClick={onClose}
                        background="#C4C4C4"
                        radius="0 0 0 20px"
                    >
                        닫기
                    </Button>
                    <Button 
                        onClick={onLogin}
                        background="#0095B7"
                        radius="0 0 20px 0"
                    >
                        로그인하러가기
                    </Button>
               </BtnWrap>
            </ModalContainer>
        </ModalBackground>
    );
};

const FadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translate(-50%, -30%);
    }
    100%{
        opacity: 1;
        transform: translate(-50%, -50%);
    }
`;

const FadeOut = keyframes`
    0% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
    100%{
        opacity: 0;
        transform: translate(-50%, -30%);
        pointer-events: none;
    }
`;

const ModalBackground = styled.div`
    position: absolute;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
    width: 90%;
    position: absolute;
    z-index: 10001;
    left: 50%;
    top: 50%;
    border-radius: 20px;
    border: none;
    transform: translate(-50%, -50%);
    background: white;
    animation: ${props => props.is_modal ? FadeIn : FadeOut} 0.3s ease-out;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0 30px;
    gap: 30px;
    
    & span {
        text-indent: -9999;
        font-size: 100px;
    }
`;

const BtnWrap = styled.div`
    height: 60px;
    display: flex;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    background-color: ${props => props.background};
    border-radius:${props => props.radius};
`;

const OneButton = styled.button`
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border-radius: 0 0 20px 20px;
    width: 100%;
    background-color: #0095B7;
    cursor: pointer;
`;

export default LoginModal;