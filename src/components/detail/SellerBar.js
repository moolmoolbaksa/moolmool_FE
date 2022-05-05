import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Image, Grid, Text } from '../../elements/index';
import { api as userActions } from '../../redux/modules/user';
import { product as productActions } from '../../redux/modules/product';

const SellerBar = (props) => {
    const dispatch = useDispatch();
    const info = useSelector(state => state.product.product_info)
    console.log(info)
    const {
        degree,
        nickname,
        profile,
        userId,
        bagImages,
        itemId,
    } = useSelector(state => state.product.product_info);
   
    const onGoUserMall = () => {
        dispatch(userActions.getCounterUserInfoApi(userId));
    };

    const onGoDetail = () => {
        dispatch(productActions.getProductApi(itemId));
        // 더보기가 생겨서 개별 상세페이지로 연결되면 어떨까함
    }

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
            </InfoContainer>
            <ItemContainer>
                <Grid
                    flex
                >
                    <Text 
                        text={`${nickname} 님의 다른물건`}
                        size="13px"
                        letterSpacing="-1px"
                        bold="bold"
                        width="max-content"
                    />
                    <StyledLink 
                        to='#'
                        onClick={onGoUserMall}
                    >
                        더보기
                    </StyledLink>
                </Grid>
                <Grid is_flex margin="10px 0 0 0">
                    {bagImages && bagImages.map((v, i) => {
                        return <Image 
                                    shape="circle"
                                    onClick={onGoUserMall}
                                    key={i}
                                    src={v}
                                    size="36"
                                    margin="0 7px 0 0"
                                />
                    })}
                </Grid>
            </ItemContainer>
        </>
    );
};

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 11px 16px;
`;

const ItemContainer = styled.div`
    border-bottom: 1px #f5f5f5 solid;
    border-top: 1px #f5f5f5 solid;
    padding: 8px 16px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 13px;
    line-height: 12.5px;
    text-align: right;
    color: #9d9d9d;
    letter-spacing: -1px;
    border-bottom: 1px #9d9d9d solid;
    cursor: pointer;
`;

export default SellerBar;

