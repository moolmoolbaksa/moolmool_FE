import React, { useEffect } from 'react';
import styled from 'styled-components';

const GlobalStyle = ({children}) => {

    const handleResize = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    handleResize();
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <GlobalComponent>
            {children}
        </GlobalComponent>
    );
};

const GlobalComponent = styled.div`
    position: absolute;
    width: 100%;
    min-width: 320px;
    max-width: 420px;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    background-color: white;
    box-shadow: 0 48px 100px 0 rgb(17 12 46 / 15%);

    @media screen and (min-width: 420px) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @media screen and (min-width: 900px) {
        top: 50%;
        left: 50%;
        transform: translate(-15%, -50%);
    }

    @media screen and (min-width: 1120px) {
        top: 50%;
        left: 50%;
        transform: translate(30%, -50%);
    }

    @media screen and (min-width: 1700px) {
        top: 50%;
        left: 50%;
        transform: translate(40%, -50%);
    }

    @media screen and (min-width: 2000px) {
        top: 50%;
        left: 50%;
        transform: translate(50%, -50%); 
    }
`;

export default GlobalStyle;