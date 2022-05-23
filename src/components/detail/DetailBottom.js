import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Grid, Button, Text } from '../../elements/index';
import { setAlertModal, setDeleteModal, setLoginModal } from '../../redux/modules/modal';
import { api as productActions } from '../../redux/modules/product';
import { ReactComponent as HeartIcon } from '../../images/하트.svg';
import { ReactComponent as HeartIconRed } from '../../images/하트(빨강).svg';
import LoginModal from '../modal/LoginModal';
import DeleteModal from '../modal/DeleteModal';
import { ChatAPI, HistoryAPI } from '../../shared/api';
import { history } from '../../redux/configureStore';
import { enterRoom } from '../../redux/modules/chat';
import AlertModal from '../modal/AlertModal';

const DetailBottom = props => {
    const dispatch = useDispatch();
    const Roomlist = useSelector(state => state.chat.Roomlist);
    const my_nickname = useSelector(state => state.user.user_info.nickname);
    const is_login = useSelector(state => state.user.is_login);
    const { userId, nickname, isScrab, itemId, scrabCnt, profile, traded, barterId, status } = useSelector(
        state => state.product.product_info,
    );
    const btnRef = useRef();

    const clickHeart = () => {
        if (nickname === my_nickname) return;
        if (is_login) {
            dispatch(productActions.setProductScrabApi(itemId));
        } else {
            window.alert('로그인 후 이용해주세요');
        }
    };

    const onDoTrade = () => {
        if (!is_login) {
            dispatch(setLoginModal(true));
            return;
        }
        if([2, 3, 4].includes(status)) return dispatch(setAlertModal(true));
        dispatch(productActions.getTradeProductApi({ itemId, userId }));
    };

    const onDoChat = () => {
        if (!is_login) {
            dispatch(setLoginModal(true));
            return;
        }
        for (let element of Roomlist) {
            console.log(element);
            if (element.userId === userId) {
                dispatch(enterRoom({ roomId: element.roomId, nickname: nickname, userId: userId, profile: profile,isBanned:element.isBanned }));
                history.push(`/chat/${element.roomId}`);
                break;
            }
        }
        ChatAPI.addChatRoom(userId)
            .then(res => {
                console.log(res);
                console.log('userid:' + userId);
                dispatch(enterRoom({ roomId: res.data, nickname: nickname, userId: userId, profile: profile,isBanned:false }));
                history.push(`/chat/${res.data}`);
            })
            .catch(error => {
                console.log(error);
                console.log('error check');
                console.log('userid:' + userId);
            });
    };

    const onDoCancle = () => {
        HistoryAPI.cancelTrade(barterId)
        .then(res => {
            history.push('/');
        })
        .catch(error => {
            console.log(error);
        });
    };

    const onDeleteProduct = () => {
        dispatch(setDeleteModal(true));
    };

    const onEdit = () => {
        history.push(`/editproduct/${itemId}`);
    };

    return (
        <>
            <Container bg={my_nickname === nickname}>
                <Wrap>
                    <HeartOuter onClick={clickHeart}>
                        {isScrab ? <HeartIconRed ref={btnRef} /> : <HeartIcon ref={btnRef} />}
                        {scrabCnt !== 0 && (
                            <Text
                                text={scrabCnt ? scrabCnt : '0'}
                                size="12px"
                                lineHeight="10px"
                                width="fit-content"
                                textAlign="center"
                            />
                        )}
                    </HeartOuter>
                </Wrap>
                <Grid is_flex width="85%" height="60px">
                    {my_nickname === nickname ? (
                        <>
                            <Button onClick={onDeleteProduct} background="gray">
                                삭제
                            </Button>
                            <Button
                                onClick={onEdit}
                                color="white"
                                background="yellow"
                            >
                                수정
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={onDoChat} background="yellow" size="19px">
                                채팅보내기
                            </Button>
                            {traded !== 'true' ? (
                                <Button onClick={onDoTrade} color="white" background="blue">
                                    {[0, 1].includes(status) ? '교환신청' : (status === 2 ? '교환중' : '교환완료')}
                                </Button>
                            ) : (
                                <Button onClick={onDoCancle} color="black" background="gray">
                                    교환취소
                                </Button>
                            )}
                        </>
                    )}
                </Grid>
            </Container>
            <LoginModal />
            <DeleteModal itemId={itemId} />
            <AlertModal>{status === 2 ? '교환 진행 중인 상품입니다.' : '교환 완료된 상품입니다.'}</AlertModal>
        </>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${props => (props.bg ? props.theme.palette.gray : props.theme.palette.yellow)};
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
