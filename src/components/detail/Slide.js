import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Slide = (props) => {
    const images = useSelector(state => state.product.product_info.images);
    const imageCnt = images.length;
    const wrapRef = useRef();
    const dotRef = useRef([]);

    let start_x;
    let curPos = 0;

    const onTouchStart = useCallback((e) => {
        start_x = e.touches[0].pageX;
    }, []);

    const onTouchMove = useCallback((e) => {
        let offset = curPos + (e.touches[0].pageX - start_x);
        wrapRef.current.style.transform = `translate(${offset}px, 0px)`;
        wrapRef.current.style.transitionDuration = '0ms';
    }, []);

    const onTouchEnd = useCallback((e) => {
        const screenWidth = wrapRef?.current.offsetWidth;
        const sum = curPos + (e.changedTouches[0].pageX - start_x);
        let destination = Math.round(sum / screenWidth) * screenWidth;
        
        if (destination > 0) {
            // 맨 왼쪽에서 드래그 시 위치 변화x
            destination = 0;
        }
        else if (destination < -(screenWidth * (imageCnt - 1))) {
            // 맨 오른쪽에서 드래그 시 위치 변화x
            destination = -(screenWidth * (imageCnt - 1));
        }
        wrapRef.current.style.transform = `translate(${destination}px, 0px)`;
        wrapRef.current.style.transitionDuration = '300ms';
        curPos = destination;
        
        // 도트 효과
        const index = Math.abs(curPos / screenWidth);
        dotRef.current.map(v => v.classList.remove('btn-style'));
        dotRef.current[index].classList.add('btn-style'); 

        // setTimeout(() => {
        //     wrapRef.current.style.transitionDuration = '0ms';
        // }, 300);
    }, []);

    const onClickSlide = (e) => {
        const screenWidth = wrapRef?.current.offsetWidth;
        const idx = dotRef.current.indexOf(e.target);
        wrapRef.current.style.transform = `translate(-${idx * screenWidth}px, 0px)`;
        dotRef.current.map(v => v.classList.remove('btn-style'));
        dotRef.current[idx].classList.add('btn-style');
        curPos = -idx * 420;
    };
    
    useEffect(() => {
        if(dotRef.current.length > 1){
            const dot = dotRef.current;
            dot[0].classList.add('btn-style');
        }
    }, [dotRef]);

    useEffect(() => {
        const wrap = wrapRef.current;
        wrap.addEventListener('touchstart', onTouchStart);
        
        return () => {
            wrap.removeEventListener('touchstart', onTouchStart);
        };
        
    }, [wrapRef, onTouchStart]);

    useEffect(() => {
        const wrap = wrapRef.current;
        wrap.addEventListener('touchmove', onTouchMove);
        
        return () => {
            wrap.removeEventListener('touchmove', onTouchMove);
        };
    }, [wrapRef, onTouchMove])

    useEffect(() => {
        const wrap = wrapRef.current;
        wrap.addEventListener('touchend', onTouchEnd);
        
        return () => {
            wrap.removeEventListener('touchend', onTouchEnd);
        };
    }, [wrapRef, onTouchEnd])

    return (
        <SlideContainer>
            <SlideWrap ref={wrapRef} >
                {images.length && images.map((v,i) => {
                    return  <SlideImage 
                                key={i}
                                src={v}
                            />
                })}
            </SlideWrap>
            <SlideDotsWrap>
                {images.length > 1 && images.map((_, i) => {
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
    width: 100%;
    min-width: 100%;
    height: 0px;
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
    background-color: ${props => props.theme.palette.gray};
    transition: all 0.1s ease-out;
    
    &.btn-style {
        width: 20px;
        border-radius: 5px;
        background: ${props => props.theme.palette.yellow};
    }
`;

export default Slide;