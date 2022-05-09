import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Grid, Button, Text } from '../../elements/index';
import { setDeleteModal, setLoginModal } from '../../redux/modules/modal';
import { api as productActions } from '../../redux/modules/product';
import LoginModal from '../modal/LoginModal';
import DeleteModal from '../modal/DeleteModal';
import {ChatAPI} from '../../shared/api';

const DetailBottom = (props) => {
    const dispatch = useDispatch();
    
    const my_nickname = useSelector(state => state.user.user_info.nickname);
    const is_login = useSelector(state => state.user.is_login);
    const {userId, nickname, isScrab, itemId, scrabCnt} = useSelector(state => state.product.product_info);
    
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

    const onDoTrade = () => {
        if(!is_login){
            dispatch(setLoginModal(true));
            return;
        };
        dispatch(productActions.getTradeProductApi({itemId, userId}));
    };

    const onDoChat = () => {
        if(!is_login){
            dispatch(setLoginModal(true));
            return;
        }
        ChatAPI.addChatRoom(userId)
        .then((res)=>{
            console.log(res);
            console.log('userid:'+userId);
        })
        .catch((error)=>{
            console.log(error);
            console.log('error check');
            console.log('userid:'+userId);
        })
    };

    const onDeleteProduct = () => {
        dispatch(setDeleteModal(true));
    };
    
    return (
        <>
            <Container>
                <Grid 
                    is_flex
                    is_column
                    justify="center"
                    align="center" 
                >
                    <HeartOuter onClick={clickHeart}>
                        <svg
                            aria-label="좋아요 버튼"
                            ref={btnRef}
                            fill="white"
                            height="30"
                            role="img"
                            viewBox="0 0 48 48"
                            width="30"
                        >
                            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                    </HeartOuter>
                    {scrabCnt !== 0
                        &&  <Text 
                                text={scrabCnt ? scrabCnt : '0'}
                                size="12px"
                                letterSpacing="-1px"
                                color="lightgray"
                                width="fit-content"
                                textAlign="center"
                            />
                    }
                </Grid>
                <Grid
                    is_flex
                    gap="5px"
                    width="100%"
                >   
                    {my_nickname === nickname
                        ?   <Button 
                                onClick={onDeleteProduct}
                                text="삭제하기"
                                color="white"
                                size="20px" 
                                radius="3px"
                                height="50px"
                                bold="bold"
                                background="#666666"   
                                margin="0 0 0 16px"
                            />
                        :   <><Button 
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
                                onClick={onDoTrade}
                                text="교환신청"
                                color="black"
                                size="20px" 
                                radius="3px"
                                bold="bold"
                                height="50px"
                                background="#ffca39"   
                            /></>
                    }
                </Grid>
            </Container>
            <LoginModal />
            <DeleteModal itemId={itemId}/>
        </>
    );
};

const Container = styled.div`
    width: 100%;
    padding: 10px 16px 2px;
    margin-bottom: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
`;

const HeartOuter = styled.div`
    position: relative;
    user-select: none;
    height: auto;
    svg {
        cursor: pointer;
    }
`;

export default DetailBottom;