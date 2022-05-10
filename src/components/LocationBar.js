import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Text } from '../elements/index';
import { history } from '../redux/configureStore';
import { ReactComponent as ArrowIcon } from "../images/화살표.svg";
import { setPreview } from '../redux/modules/user';

const LocationBar = ({ title, transparent }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const is_login = useSelector(state => state.user.is_login);

    const onGoBack = () => {
        if(location.pathname==='/editmyinfo') dispatch(setPreview(''));
        history.goBack();
    };

    if(transparent){
        return (
            <ArrowContainer onClick={onGoBack}>
                <ArrowIcon width="40" height="40"/>
            </ArrowContainer>
        );
    };

    return (
        <Container>
            <Wrap flex>
                <ArrowIcon onClick={onGoBack} width="27" height="27"/>
                <Text 
                    text={title}
                    size="22px"
                    bold="bold"
                    width="max-content"
                />
            </Wrap>
            {is_login && location.pathname === '/mypage'
                &&  <StyledLink to="/editmyinfo">
                        프로필 수정
                    </StyledLink>
            }
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 16px 15px 8px;
    justify-content: space-between;
    background-color: transparent;
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
    border-bottom: 1px black solid;
    line-height: 14px;
    color: black;
    font-weight: bold;
    font-size: 12px;
    letter-spacing: -.67px;
    word-spacing: -.67px;
    cursor: pointer;
`;

export default LocationBar;