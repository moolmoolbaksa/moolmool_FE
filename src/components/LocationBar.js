import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Text } from '../elements/index';
import { history } from '../redux/configureStore';
import { ReactComponent as ArrowIcon } from "../images/화살표.svg";

const LocationBar = ({ title, transparent }) => {
    const is_login = useSelector(state => state.user.is_login);
    const location = useLocation();

    if(transparent){
        return (
            <ArrowContainer onClick={() => {history.push('/')}}>
                <ArrowIcon width="40" height="40"/>
            </ArrowContainer>
        )
    };

    return (
        <Container>
            <Wrap flex>
                <ArrowIcon onClick={() => {history.goBack()}} width="27" height="27"/>
                <Text 
                    text={title}
                    size="22px"
                    bold="bold"
                    width="max-content"
                />
            </Wrap>
            {is_login && location.pathname === '/mypage'
                &&  <StyledLink to="/editmyinfo">
                        수정
                    </StyledLink>
            }
            {is_login && location.pathname === '/editmyinfo'
                &&  <StyledLink to="/mypage">
                        완료
                    </StyledLink>
            }
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 16px;
    justify-content: space-between;
    background-color: #ffca39;
`;

const ArrowContainer = styled.div`
    position: absolute;
    top: 10px;
    left: 5px;
    z-index: 100;
    cursor: pointer;
`;
const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & span {
        text-indent: -9999;
        padding-bottom: 2px;
        cursor: pointer;
    }
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
`;

export default LocationBar;