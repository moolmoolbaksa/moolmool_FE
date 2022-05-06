import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Grid, Button } from '../../elements/index';
import { setModal } from '../../redux/modules/modal';
import { api as productActions } from '../../redux/modules/product';
import LoginNoti from '../modal/LoginNoti';

const DetailBottom = (props) => {
    const dispatch = useDispatch();
    
    const my_nickname = useSelector(state => state.user.user_info.nickname);
    const is_login = useSelector(state => state.user.is_login);
    const is_modal = useSelector(state => state.modal.is_modal);
    const {userId, nickname, isScrab, itemId} = useSelector(state => state.product.product_info);
    
    const btnRef = useRef();

    useEffect(() => {
        if (isScrab) {
          btnRef.current.setAttribute("fill", "#ed4956");
        } else {
          btnRef.current.setAttribute("fill", "#bdbdbd");
        }
    }, [isScrab]);

    const clickHeart = () => {
        if(nickname === my_nickname) return;
        if(is_login){
            dispatch(productActions.setProductScrabApi(itemId));
        } else {
            window.alert('로그인 후 이용해주세요')
        }
    };

    const onDoChange = () => {
        if(!is_login){
            dispatch(setModal(true));
            return;
        };
        dispatch(productActions.setTradeProductApi({itemId, userId}));
    };

    const onDoChat = () => {
        if(!is_login){
            dispatch(setModal(true));
            return;
        }
    };
    
    return (
        <>
            <Container>
                <Grid 
                    justify="center" 
                >
                    <HeartOuter onClick={clickHeart}>
                        <svg
                            aria-label="좋아요 버튼"
                            ref={btnRef}
                            fill="white"
                            height="24"
                            role="img"
                            viewBox="0 0 48 48"
                            width="24"
                        >
                            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                    </HeartOuter>
                
                </Grid>
                <Grid
                    is_flex
                    gap="5px"
                    width="100%"
                >
                    <Button 
                        onClick={onDoChat}
                        text="채팅보내기"
                        color="white"
                        size="20px" 
                        radius="3px"
                        height="50px"
                        bold="bold"
                        background="#0095b7"   
                        margin="0 0 0 16px"
                    /> 
                    <Button 
                        onClick={onDoChange}
                        text="교환신청"
                        color="black"
                        size="20px" 
                        radius="3px"
                        bold="bold"
                        height="50px"
                        background="#ffca39"   
                    /> 
                </Grid>
            </Container>
            {is_modal && <LoginNoti />}
        </>
    );
};

const Container = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 18px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
`;

const HeartOuter = styled.div`
    position: relative;
    z-index: 10;
    margin-top: 5px;
    user-select: none;
    svg {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
`;

export default DetailBottom;