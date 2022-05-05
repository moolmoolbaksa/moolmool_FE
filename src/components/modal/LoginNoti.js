import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { history } from '../../redux/configureStore';
import { setModal } from '../../redux/modules/modal';

const LoginNoti = (props) => {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setModal(false));
    };

    return (
        <ModalBackground>
            <ModalContainer>
                <Content>로그인 모달</Content>
                <BtnWrap>
                    <Button 
                        onClick={onClose}
                        background="#C4C4C4"
                        radius="0 0 0 20px"
                    >
                        닫기
                    </Button>
                    <Button 
                        onClick={() => {history.push('/login')}}
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
    height: 45%;
    min-height: 350px;
    position: absolute;
    z-index: 10001;
    left: 50%;
    top: 50%;
    border-radius: 20px;
    transform: translate(-50%, -50%);
    background: white;
`;

const Content = styled.div`
    height: 80%;
`;

const BtnWrap = styled.div`
    height: 20%;
    display: flex;
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
    border: none;
    color: white;
    font-size: 22px;
    font-weight: bold;
    background-color: ${props => props.background};
    border-radius:${props => props.radius};
`;

export default LoginNoti;