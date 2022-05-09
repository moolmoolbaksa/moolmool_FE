import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { setDeleteModal } from '../../redux/modules/modal';
import { Text, Grid } from '../../elements/index';
import { ReactComponent as CheckIcon } from '../../images/체크.svg';
import { api as productActions } from '../../redux/modules/product';

const DeleteModal = ({itemId}) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const is_delete_modal = useSelector(state => state.modal.is_delete_modal);
    
    useEffect(() => {
        if(is_delete_modal){
            setIsOpen(true);
        } else {
            setTimeout(() => setIsOpen(false), 200);
        }
    }, [is_delete_modal]);

    if(!isOpen){
        return null;
    };
    
    const onClose = () => {
        dispatch(setDeleteModal(false));
    };

    const onDeleteProduct = () => {
        dispatch(setDeleteModal(false));
        dispatch(productActions.deleteProductApi(itemId));
    };

    return (
        <ModalBackground>
            <ModalContainer is_modal={is_delete_modal}>
                <Content>
                    <StyledCheckIcon width="70" height="70" fill="#0095B7"/>
                    <Grid>
                        <Text
                            text="삭제 하시겠습니까?"
                            textAlign="center"
                            letterSpacing="-0.67px"
                            size="22px"
                            bold="bold"
                        />
                    </Grid>
                </Content>
                <BtnWrap>
                    <Button 
                        onClick={onClose}
                        background="#0095B7"
                        radius="0 0 0 20px"
                    >
                        취소
                    </Button>
                    <Button 
                        onClick={onDeleteProduct}
                        background="#C4C4C4"
                        radius="0 0 20px 0"
                    >
                        확인
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
    animation: ${props => props.is_modal ? FadeIn : FadeOut} 0.3s ease-out alternate;
`;

const StyledCheckIcon = styled(CheckIcon)``;

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0 10px;
    gap: 10px;
    
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

export default DeleteModal;