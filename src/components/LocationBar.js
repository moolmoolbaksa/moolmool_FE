import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { history } from '../redux/configureStore';

import { Text } from '../elements/index';
import { ReactComponent as ArrowIcon } from "../images/arrow.svg";
import { ReactComponent as WhiteArrowIcon } from "../images/white_arrow.svg";
import { setAddress, setPreview } from '../redux/modules/user';
import { resetTrade } from '../redux/modules/product';

const LocationBar = ({ title, transparent }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const is_login = useSelector(state => state.user.is_login);

    const onGoBack = () => {
        const page = location.pathname;
        switch(page){
            case '/editmyinfo':
                dispatch(setPreview(''));
                dispatch(setAddress(''));
                history.goBack();
                break;
            case '/trade':
                dispatch(resetTrade());
                history.replace('/');
                break;
            case '/mypage':
                history.push('/');
                break;
            case '/trproposal':
                history.replace('/noti');
                break;
            default:
                history.goBack();
        };
    };
   
    if(transparent){
        return (
            <ArrowContainer>
                <StyledWhiteArrowIcon width="40" height="40" stroke="white" onClick={() => history.goBack()}/>
            </ArrowContainer>
        );
    };

    return (
        <>
            <Container>
                <Wrap>
                    <StyledArrowIcon onClick={onGoBack} width="27" height="27"/>
                    <Text 
                        text={title}
                        size="20px"
                        bold="bold"
                        letterSpacing="-1px"
                        width="max-content"
                    />
                </Wrap>
                {is_login && location.pathname === '/mypage'
                    &&  <StyledLink to="/editmyinfo">
                            프로필 수정
                        </StyledLink>
                }
            </Container>
        </>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 16px 15px 8px;
    justify-content: space-between;
    background-color: white;
`;

const ArrowContainer = styled.div`
    position: absolute;
    top: 0;
    z-index: 100;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0));
`;

const StyledWhiteArrowIcon = styled(WhiteArrowIcon)`
    padding: 5px;
    cursor: pointer;
`;

const StyledArrowIcon = styled(ArrowIcon)`
    cursor: pointer;
`;

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    & span {
        text-indent: -9999;
        padding-bottom: 2px;
        cursor: pointer;
    }
`;

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