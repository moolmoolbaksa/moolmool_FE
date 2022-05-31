import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { history } from '../redux/configureStore';

import { Text } from '../elements/index';
import { ReactComponent as ArrowIcon } from "../images/arrow.svg";
import { ReactComponent as WhiteArrowIcon } from "../images/white_arrow.svg";
import { setAddress, setPreview } from '../redux/modules/user';
import { resetTrade } from '../redux/modules/product';

const LocationBar = ({ title, type }) => {
    const dispatch = useDispatch();
    const location = useLocation();

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
            case '/trproposal':
                history.replace('/noti');
                break;
            default:
                history.goBack();
        };
    };

    if(type==='detail'){
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

export default LocationBar;