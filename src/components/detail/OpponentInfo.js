import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Image, Grid, Text } from '../../elements/index';
import { api as userActions } from '../../redux/modules/user';
import { history } from '../../redux/configureStore';

const OpponentInfo = (props) => {
    const dispatch = useDispatch();
    const my_nickname = useSelector(state => state.user.user_info.nickname);
    const {
        degree,
        nickname,
        profile,
        userId,
    } = useSelector(state => state.product.product_info);

    const onGoUserMall = () => {
        if(my_nickname === nickname){
            history.push('/mypage');
            return;
        };
        dispatch(userActions.getCounterUserInfoApi(userId));
    };

    return (
        <>
            <InfoContainer>
                <Grid
                    is_flex
                >
                    <Image 
                        onClick={onGoUserMall}
                        src={profile}
                        shape="circle" 
                        size="56"
                        margin="0px"
                    />
                    <Grid 
                        flex 
                        is_column
                        justify="center"
                        margin="0 0 0 15px"
                    >
                        <Text 
                            text={degree}
                            color="#8b8686"
                            size="13px"
                            letterSpacing="-1px"
                        />
                        <Text 
                            onClick={onGoUserMall}
                            text={nickname}
                            size="13px"
                            bold="bold"
                            letterSpacing="-1px"
                        />
                    </Grid>
                </Grid>
                <StyledLink 
                    to='#'
                    onClick={onGoUserMall}
                >
                    보따리 구경하기
                </StyledLink>
            </InfoContainer>
        </>
    );
};

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 16px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 13px;
    line-height: 15px;
    text-align: right;
    color: #9d9d9d;
    letter-spacing: -1px;
    word-spacing: -1px;
    border-bottom: 1px #9d9d9d solid;
    cursor: pointer;
`;

export default OpponentInfo;

