import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setReload } from '../../redux/modules/item';
import { history } from '../../redux/configureStore';
import { fadeIn } from '../../animation/fade';

import { Text, Grid } from '../../elements/index';
import { ReactComponent as ExclamationIcon } from '../../images/exclamation_mark.svg';

const NoneModal = (props) => {
    const dispatch = useDispatch();
 
    const onClose = () => {
        dispatch(setReload());
        history.replace('/');
    };
    
    return (
        <ModalBackground>
            <ModalContainer >
                <Content>
                    <Round>
                        <ExclamationIcon />
                    </Round>
                    <Grid>
                        <Text
                            text='삭제된 게시물입니다.'
                            textAlign="center"
                            letterSpacing="-1px"
                            wordSpacing="-1px"
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
    animation: ${fadeIn} 0.3s ease-out;
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

export default NoneModal;