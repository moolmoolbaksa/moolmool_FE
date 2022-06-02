import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertModal } from '../../redux/modules/modal';
import { fadeIn, fadeOut } from '../../animation/fade';

import { Text, Grid } from '../../elements/index';
import { ReactComponent as ExclamationIcon } from '../../images/exclamation_mark.svg';

const AlertModal = ({children}) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const is_alert_modal = useSelector(state => state.modal.is_alert_modal);
 
    useEffect(() => {
        let timeout;
        if(is_alert_modal){
            setIsOpen(true);
        } else {
            timeout = setTimeout(() => setIsOpen(false), 200);
        };
        return () => clearTimeout(timeout);
    }, [is_alert_modal]);

    if(!isOpen){
        return null;
    };
    
    const onClose = () => {
        dispatch(setAlertModal(false));
    };
    
    return (
        <ModalBackground>
            <ModalContainer is_modal={is_alert_modal}>
                <Content>
                    <Round>
                        <ExclamationIcon />
                    </Round>
                    <Grid>
                        {children.length < 20
                            ?   <Text
                                    text={children}
                                    textAlign="center"
                                    letterSpacing="-1px"
                                    wordSpacing="-1px"
                                    size="20px"
                                    bold="bold"
                                />
                            :   <Text
                                    text={children}
                                    textAlign="center"
                                    letterSpacing="-1px"
                                    wordSpacing="-1px"
                                    size="16px"
                                    bold="bold"
                                />
                        }
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
    animation: ${props => props.is_modal ? fadeIn : fadeOut} 0.3s ease-out;
`;

const Content = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 30px 0 20px;
    gap: 15px;
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
`;

export default AlertModal;