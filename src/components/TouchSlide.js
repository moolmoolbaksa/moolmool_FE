import React from 'react';
import styled from 'styled-components';

const TouchSlide = ({ itemList }) => {
    return (
        <>
            <SlideWrap className='no-scroll'>
                {itemList.map(v => {
                    return  <ImageWrap
                                key={v.itemId}
                                src={v.image}
                            />
                })}
            </SlideWrap>
        </>
    );
};

const SlideWrap = styled.div`
    width: 100%;
    display: flex;
    column-gap: 15px;
    overflow: auto;
    flex-wrap: nowrap;
    /* grid-template-columns: repeat(auto-fill, 1fr); */
    /* display: grid; */
    /* grid-auto-columns: 33%; */
    /* grid-template-columns: repeat(3, 1fr); */
    /* grid-auto-flow: column;  row 를 가지지않을거라면 반드시! */
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
    min-width: 120px;
    height: 120px;
    border-radius: 5px;
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

export default TouchSlide;