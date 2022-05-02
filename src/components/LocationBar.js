import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Text } from '../elements/index';
import { history } from '../redux/configureStore';

const LocationBar = ({ title }) => {
    const is_login = useSelector(state => state.user.is_login);
    const location = useLocation();
    
    return (
        <Container>
            <Wrap flex>
                <span 
                    className="material-symbols-outlined"
                    onClick={() => {history.goBack()}}
                >
                    arrow_back_ios
                </span>
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
    padding: 10px 16px;
    justify-content: space-between;
    background-color: lightgray;
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