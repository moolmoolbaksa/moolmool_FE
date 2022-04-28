import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Grid, Button, Text } from '../../elements/index';

const DetailBottom = (props) => {
    const [ heartClick, setHeartClick ] = useState(false);
    const btnRef = useRef();

    useEffect(() => {
        if (heartClick) {
          btnRef.current.setAttribute("fill", "#ed4956");
        } else {
          btnRef.current.setAttribute("fill", "#bdbdbd");
        }
    }, [heartClick]);

    const clickHeart = () => {
        setHeartClick(!heartClick);
    };
    
    return (
        <Container>
            <Grid 
                justify="center" 
                padding="0 0 0 16px"
            >
                <HeartOuter onClick={clickHeart}>
                    <svg
                        aria-label="좋아요 버튼"
                        ref={btnRef}
                        fill="white"
                        height="24"
                        role="img"
                        viewBox="0 0 48 48"
                        width="24"
                    >
                        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    </svg>
                </HeartOuter>
                <Text 
                    text="1"
                    size="12px"
                    letterSpacing="-1px"
                    color="lightgray"
                    textAlign="center"
                />
            </Grid>
            <Button 
                width="150px"
                text="바꿀래요!"
                color="white"
                size="18px" 
                background="black"   
            /> 
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 420px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid lightgray;
    background-color: white;
`;

const HeartOuter = styled.div`
    position: absolute;
    z-index: 10;
    margin-top: 5px;
    svg {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
`;
export default DetailBottom;