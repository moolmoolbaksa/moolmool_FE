import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Grid, Button, Text } from '../../elements/index';
import { setDeleteModal, setLoginModal } from '../../redux/modules/modal';
import { api as productActions } from '../../redux/modules/product';
import { ReactComponent as HeartIcon } from '../../images/하트.svg';
import { ReactComponent as HeartIconRed } from '../../images/하트(빨강).svg';
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
            <Container bg={my_nickname === nickname}>
                <Wrap>
                    <HeartOuter onClick={clickHeart}>
                        <HeartIcon ref={btnRef}/>
                        {/* <HeartIconRed ref={btnRef}/> */}
                        {scrabCnt !== 0
                            &&  <Text 
                                    text={scrabCnt ? scrabCnt : '0'}
                                    size="12px"
                                    lineHeight="10px"
                                    width="fit-content"
                                    textAlign="center"
                                />
                        }
                    </HeartOuter>
                </Wrap>
                <Grid
                    is_flex
                    width="85%"
                >   
                    {my_nickname === nickname
                        ?   <><Button 
                                onClick={onDeleteProduct}
                                text="삭제"
                                size="20px" 
                                radius="3px"
                                height="60px"
                                bold="bold"
                                background="#E8E8E8"   
                            />
                            <Button 
                                // onClick={onDoTrade}
                                text="수정"
                                color="white"
                                size="20px" 
                                bold="bold"
                                height="60px"
                                background="#0095b7"   
                            /></>
                        :   <><Button 
                                onClick={onDoChat}
                                text="채팅보내기"
                                size="20px" 
                                height="60px"
                                bold="bold"
                                background="#FFD467"   
                            /> 
                            <Button 
                                onClick={onDoTrade}
                                text="교환신청"
                                color="white"
                                size="20px" 
                                bold="bold"
                                height="60px"
                                background="#0095b7"   
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
    margin: 10px 0 0;
    display: flex;
    align-items: center;
    background-color: ${props => props.bg ? "#E8E8E8" : "#FFD467"};
`;

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    border-right: 2px #666666 solid;
`;

const HeartOuter = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 38px;
    svg {
        cursor: pointer;
    }
`;

export default DetailBottom;