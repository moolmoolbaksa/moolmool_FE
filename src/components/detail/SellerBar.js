import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Image, Grid, Text } from '../../elements/index';
const SellerBar = (props) => {
    // degree, nickname, profile, userId
    return (
        <Container>
            <Grid
                is_flex
            >
                <Image 
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
                        text="물물학사"
                        color="gray"
                    />
                    <Text 
                        text="범인은나야"
                        size="18px"
                    />
                </Grid>
            </Grid>
            <StyledLink to="#">정보 보기</StyledLink>
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
`;

export default SellerBar;

