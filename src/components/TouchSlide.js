import React from 'react';
import styled from 'styled-components';

import { Text } from '../elements/index';
import { response } from '../shared/mock';

const TouchSlide = ({ title, myScrabList }) => {
    console.log(myScrabList)
    return (
        <>
            <Text 
                text={title}
                bold="bold"
                size="24px"
                margin="0 0 10px 0"
                letterSpacing="-1px"
            />
            <SlideWrap className='no-scroll'>
                {myScrabList.map(v => {
                    return  <ImageWrap 
                                key={v.itemId}
                                src={v.itemImg}
                            />
                })}
            </SlideWrap>
        </>
    );
};

const SlideWrap = styled.div`
    width: 100%;
    display: flex;
    overflow: auto;
    flex-wrap: nowrap;
    &.no-scroll {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
    &.no-scroll::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }
    scroll-behavior: smooth;
`;

const ImageWrap = styled.div`
    margin-right: 10px;
    min-width: 140px;
    height: 140px;
    border-radius: 5px;
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

export default TouchSlide;