import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { response } from '../shared/mock';

const Test = (props) => {
    const wrapRef = useRef();
    const dotRef = useRef([]);
    const imageRef = useRef([]);
    let start_x, end_x;
    let curPos = 0;

    useEffect(() => {
        dotRef.current[0].classList.add('btn-style');
    }, []);

    useEffect(() => {
        wrapRef.current.addEventListener('touchstart', (e) => {
            start_x = e.touches[0].pageX;
        });
    }, [])

    useEffect(() => {
        wrapRef.current.addEventListener('touchmove', (e) => {
            let offset = (e.touches[0].pageX - start_x);
            wrapRef.current.style.transform = `translate(${offset}px, 0px)`;
            wrapRef.current.style.transitionDuration = '0ms';
            start_x = e.touches[0].pageX;
        });
    }, [])

    useEffect(() => {
        wrapRef.current.addEventListener('touchend', (e) => {
            
        });
    }, [])

    const onClickSlide = (e) => {
        const idx = dotRef.current.indexOf(e.target);
        wrapRef.current.style.transform = `translate(-${idx}00%)`;
        dotRef.current.map(v => v.classList.remove('btn-style'));
        dotRef.current[idx].classList.add('btn-style');
    };

    const touchStart = (e) => {
        start_x = e.touches[0].pageX;
    };

    const touchEnd = (e) => {
        end_x = e.changedTouches[0].pageX;
        const delta = 150;
        start_x > end_x ? next() : prev();
    };

    function prev(){
        if(curPos > 0){
            curPos = curPos - 1;
            wrapRef.current.style.transform = `translate(-${curPos*100}%)`;
            dotRef.current.map(v => v.classList.remove('btn-style'));
            dotRef.current[curPos].classList.add('btn-style');  
        };
    };

    function next(){
        if(curPos < response.list.length){
            curPos = curPos + 1;
            wrapRef.current.style.transform = `translate(-${curPos*100}%)`;
            dotRef.current.map(v => v.classList.remove('btn-style'));
            dotRef.current[curPos].classList.add('btn-style');
        };
    };

    return (
        <SlideContainer>
            <SlideWrap ref={wrapRef} onTouchEnd={touchEnd}>
                {response.list.map((v,i) => {
                    return  <SlideImage 
                                key={i}
                                src={v.image}
                                ref={el => imageRef.current[i] = el}
                            />
                })}
            </SlideWrap>
            <SlideDotsWrap>
                {response.list.length !== 0 && response.list.map((_, i) => {
                    return  <SlideDot 
                                key={i}
                                onClick={onClickSlide}
                                ref={el => dotRef.current[i] = el}
                            />
                })}
            </SlideDotsWrap>
        </SlideContainer>
    );
};

const SlideContainer = styled.div`
    position: relative;
    overflow: hidden;
`;

const SlideWrap = styled.div`
    display: flex;
    transition: transform 0.3s ease-out;
`;

const SlideImage = styled.div`
    min-width: 100%;
    height: 0;
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding-bottom: calc(120%);
`;

const SlideDotsWrap = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    bottom: 20px;
`;

const SlideDot = styled.button`
    position: relative;
    width: 10px;
    height: 10px;
    border: none;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    background-color: #0095b7;
    transition: all 0.1s ease-out;
    
    &.btn-style {
        width: 20px;
        border-radius: 5px;
        background: #FFD467;
    }
`;

export default Test;