import React from 'react';
import styled, { keyframes } from 'styled-components';

import Logo from '../../images/logo 1.png';

const Loading = (props) => {
    return (
        <Container>
            <Wrap>
                <span>똑똑한 교환 생활</span>
                <img 
                    src={Logo}
                    alt="로고 이미지"
                    height="53px"
                    width="199px"
                />
                <Spinner className='loader' />
            </Wrap>
        </Container>
    );
};

const Loader = keyframes`
    0% { 
        transform: rotate(0deg); 
    }
    100% { 
        transform: rotate(360deg); 
    }
`;

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 1000;
    background: white;
`;

const Wrap = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & span {
        font-family: 'Jua', sans-serif;
        color: #FFD467;
        font-size: 20px;
        margin-bottom: 5px;
    }   
`;

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 20px;
    display: inline-block;
    position: relative;
    vertical-align: middle;

    &,
    &:before,
    &:after {
        animation: 1s infinite ease-in-out;
    }
    &:before,
    &:after {
        width: 100%; 
        height: 100%;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
    }

    & {
        background-color: white;
        animation: ${Loader} 0.6s infinite linear;
    }

    &.loader:before {
        content: '';
        width: 80%;
        height: 80%;
        background-color: white;
        top: 10%;
        left: 10%;
        box-shadow: 5px -3px 0 rgba(255,100,100,0.7),
                    5px 5px 0 rgba(100,255,100,0.7),
                    -3px 5px 0 rgba(100,100,255,0.7),
                    -5px -5px 0 rgba(240,240,120,0.7);
    }
    &.loader:after {
        content: '';
        border: 3px solid white;
        z-index: 2;
        top: -3px;
        left: -3px;
    }
`;

export default Loading;

