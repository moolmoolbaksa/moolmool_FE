import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Text } from '../elements/index';

const LocationBar = ({ title }) => {
    const is_login = useSelector(state => state.user.is_login);
    const location = useLocation();
  
    return (
        <Container>
            <Text 
                text={title}
                size="22px"
                bold="bold"
                width="max-content"
            />
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
    background-color: lightgray;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
`;

export default LocationBar;