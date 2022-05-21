import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { setReportModal } from '../../redux/modules/modal';
import { Text, Grid } from '../../elements/index';

const ReportModal = ({type}) => {
    const dispatch = useDispatch();
    const is_report_modal = useSelector(state => state.modal.is_report_modal);
    const [isOpen, setIsOpen] = useState(false);
    const [checkedInputs, setCheckedInputs] = useState([]);
    const textRef = useRef();
    const report_arr = ['영리목적/광고', '욕설/인신공격', '음란성/선정성', '같은내용 반복개시', '개인정보노출', '저작권침해', '기타'];

    useEffect(() => {
        let timeout;
        if(is_report_modal){
            setIsOpen(true);
        } else {
            setTimeout(() => setIsOpen(false), 200);
        };
        return () => clearTimeout(timeout);
    }, [is_report_modal]);

    if(!isOpen){
        return null;
    };
    
    const onClose = () => {
        dispatch(setReportModal(false));
    };

    const changeHandler = (checked, id) => {
        if (checked) {
          setCheckedInputs([...checkedInputs, id]);
        } else {
          setCheckedInputs(checkedInputs.filter((el) => el !== id));
        };
    };

    return (
        <ModalBackground>
            <ModalContainer is_modal={is_report_modal}>
                <Content>
                    <span>신고사유</span>
                    <ListWrap>
                        {report_arr.map((v, i) => {
                            return  <List key={i}>
                                        <StyledInput type="checkbox" id={`check${i}`} onChange={(e) => changeHandler(e.target.checked, `check${i}`)}/>
                                        <label htmlFor="check" />
                                        {v}
                                    </List>
                        })}
                    </ListWrap>
                    <TextArea></TextArea>
                    <Grid is_flex is_column justify="flex-start" gap="2px">
                        <List><StyledInput type="checkbox" id="check7"/>해당유저 차단하기</List>
                        <Text 
                            text="반복된 허위신고는 제재를 받을 수 있습니다."
                            color="#9D9D9D" letterSpacing="-1px" size="13px"
                        />
                    </Grid>
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
                        onClick={onClose}
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
    gap: 15px;
    
    & span {
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 15px;
        border-bottom: 1px #e8e8e8 solid;
    };
`;

const ListWrap = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 20px;
`;

const List = styled.li`
    display: flex;
    align-items: center;
    letter-spacing: -1px;
    word-spacing: -1px;
    font-size: 14px;
`;

const TextArea = styled.textarea`
    height: 50px;
    width: 100%;
    border: 1px #C4C4C4 solid;
    border-radius: 5px;
    resize: none;
    outline: none;
    padding: 2px;
`;

const StyledInput = styled.input`
    margin-right: 5px;
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