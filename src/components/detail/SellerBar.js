import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Image, Grid, Text } from '../../elements/index';
import { history } from '../../redux/configureStore';
import { api as userActions } from '../../redux/modules/user';

const SellerBar = (props) => {
    const dispatch = useDispatch();
    const info = useSelector(state => state.product.product_info)
    console.log(info)
    const {
        degree,
        nickname,
        profile,
        userId,
    } = useSelector(state => state.product.product_info);
    console.log(degree,
        nickname,
        profile,
        userId)
    const onGoUserMall = () => {
        dispatch(userActions.getCounterUserInfoApi(userId));
    };

    return (
        <Container>
            <Grid
                is_flex
            >
                <Image 
                    onClick={onGoUserMall}
                    src={profile}
                    shape="circle" 
                    size="50"
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
                        color="gray"
                    />
                    <Text 
                        onClick={onGoUserMall}
                        text={nickname}
                        size="18px"
                    />
                </Grid>
            </Grid>
            <StyledLink 
                to='#'
                onClick={onGoUserMall}
            >
                정보 보기
            </StyledLink>
        </Container>
    );
};

const Container = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid lightgray;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: 700;
    color: black;
    letter-spacing: -1px;
`;

export default SellerBar;

