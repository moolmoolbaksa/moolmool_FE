import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Text, Grid } from '../elements/index';
import { api as productActions } from '../redux/modules/product';

const TouchSlide = ({ title, myScrabList }) => {
    const dispatch = useDispatch();

    const onGoScrabPage = () => {
        dispatch(productActions.getMyScrabListApi());
    };

    const onGoDetail = (e) => {
        dispatch(productActions.getProductApi(e.target.dataset.id));
    };
    console.log(myScrabList)
    
    return (
        <>
            <Grid
                flex
                margin="0 0 10px 0"
            >
                <Text 
                    text={title}
                    bold="bold"
                    size="24px"
                    letterSpacing="-1px"
                    width="max-content"
                />
                <StyledLink
                    to="/scrab"
                    onClick={onGoScrabPage}
                >
                    더보기
                </StyledLink>
            </Grid>
            <SlideWrap className='no-scroll'>
                {myScrabList.map(v => {
                    return  <ImageWrap
                                onClick={onGoDetail} 
                                key={v.itemId}
                                src={v.image}
                                data-id={v.itemId}
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

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 13px;
    line-height: 12.5px;
    text-align: right;
    color: black;
    letter-spacing: -1px;
    border-bottom: 1px #9d9d9d solid;
    cursor: pointer;
`;

export default TouchSlide;