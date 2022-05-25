import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { deleteReportModal } from '../../redux/modules/modal';
import { Text } from '../../elements/index';
import { api as ItemActions } from '../../redux/modules/item';

const ReportModal = (props) => {
    const dispatch = useDispatch();
    const {is_report_modal, content, itemId} = useSelector(state => state.modal.report_modal);
    const [isOpen, setIsOpen] = useState(false);
   
    useEffect(() => {
        let timeout;
        if(is_report_modal){
            setIsOpen(true);
        } else {
            timeout = setTimeout(() => setIsOpen(false), 200);
        };
        return () => clearTimeout(timeout);
    }, [is_report_modal]);

    if(!isOpen){
        return null;
    };
    
    const onClose = () => {
        dispatch(deleteReportModal());
    };

    const onReport = () => {
        dispatch(deleteReportModal());
        dispatch(ItemActions.setReportItemApi(itemId));
    };

    return (
        <ModalBackground>
            <ModalContainer is_modal={is_report_modal}>
                <Content>
                    <span>게시아이템 신고확인</span>
                    <span>해당 아이템을 '<b>{content}</b>' 사유로 신고하시겠습니까?</span>
                    <Text 
                        text=" * 반복된 허위신고는 제재를 받을 수 있습니다."
                        color="#9D9D9D" letterSpacing="-1px" size="13px"
                    />
                </Content>
                <BtnWrap>
                    <Button 
                        onClick={onClose}
                        background="#9D9D9D"
                        radius="0 0 0 20px"
                    >
                        취소
                    </Button>
                    <Button 
                        onClick={onReport}
                        background="#0095b7"
                        radius="0 0 20px 0"
                    >
                        신고하기
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
    flex-flow: column nowrap;
    justify-content: center;
    padding: 20px 16px 20px;
    gap: 7px;
    
    span:nth-of-type(1) {
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 15px;
        border-bottom: 1px #e8e8e8 solid;
    };
    span:nth-of-type(2) {
        display: inline-block;
        width: 100%;
        padding-top: 5px;
        font-size: 14px;
        letter-spacing: -1px; 
    };
`;

const BtnWrap = styled.div`
    height: 55px;
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

export default ReportModal;;