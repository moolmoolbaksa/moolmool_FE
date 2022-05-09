import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { setTradeModal } from '../../redux/modules/modal';
import { Text, Grid } from '../../elements/index';
import { ReactComponent as CheckIcon } from '../../images/체크.svg';
import { api as productActions } from '../../redux/modules/product';

const AlertModal = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const is_alert_modal = useSelector(state => state.modal.is_alert_modal);
 
    useEffect(() => {
        if(is_alert_modal){
            setIsOpen(true);
        } else {
            setTimeout(() => setIsOpen(false), 200);
        }
    }, [is_alert_modal]);

    if(!isOpen){
        return null;
    };
    
    const onClose = () => {
        dispatch(setTradeModal(false));
    };

    return (
        <ModalBackground>
            <ModalContainer is_modal={is_alert_modal}>
                <Content>
                    <Round>
                        <span className="material-symbols-outlined">
                            priority_high
                        </span>
                    </Round>
                    <Grid>
                        <Text
                            text="아이템을 선택해주세요."
                            textAlign="center"
                            letterSpacing="-1px"
                            wordSpacing="-2px"
                            size="20px"
                            bold="bold"
                        />
                    </Grid>
                </Content>
                <BtnWrap>
                        <OneButton
                            onClick={onClose}
                        >
                            확인
                        </OneButton>
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
    animation: ${props => props.is_modal ? FadeIn : FadeOut} 0.3s ease-out alternate;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0 20px;
    gap: 15px;
    
    & span {
        text-indent: -9999;
        font-size: 100px;
    }
`;

const BtnWrap = styled.div`
    height: 60px;
    display: flex;
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

const Round = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50px;
    background-color: #ffca39;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    & span {
        text-indent: -9999;
        font-size: 30px;
        color: white;
        text-align: center;
    }
`;

export default AlertModal;