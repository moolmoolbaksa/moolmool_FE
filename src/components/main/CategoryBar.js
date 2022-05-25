import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';

import { Grid } from '../../elements';
import { ReactComponent as ArrowIcon } from '../../images/expand_more_arrow.svg';
import refresh from '../../images/outline_replay_black_18pt_1x.png';

const CategoryBar = ({setfilter}) => {
    const [isOpen, setIsOpen] = useState(false);
    const category = useSelector(state => state.item.paging.category);
    
    const category_list = [
        '디지털기기',
        '생활가전',
        '가구/인테리어',
        '유아동',
        '유아도서',
        '생활/가공식품',
        '스포츠/레저',
        '여성잡화',
        '여성의류',
        '남성패션/잡화',
        '게임/취미',
        '뷰티/미용',
        '반려동물용품',
        '도서/티켓/음반',
        '식물',
    ];

    return (
        <Container>
            <Wrap>
                <Grid flex gap="3px" >
                    <CategoryText category={category}>{category ? category : '카테고리 선택'}</CategoryText>
                    {category && <RefreshIcon src={refresh} alt="새로고침" onClick={() => {setfilter('전체'); setIsOpen(false)}} style={{paddingTop: '2px'}}/>}
                </Grid>
                <Grid width="100%" is_flex justify="flex-end" onClick={() => setIsOpen(!isOpen)}>
                    <StyledArrowIcon open={isOpen}/>
                </Grid>
            </Wrap>
            <CategoryContainer>
                {isOpen &&
                    <CategoryWrap>
                        {category_list.map((v, i) => {
                            return <Category key={i} onClick={() => {setfilter(v); setIsOpen(!isOpen);}}>{v}</Category>
                        })}
                    </CategoryWrap>
                }
            </CategoryContainer>
        </Container>
    );
};

const DrawIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0%);
    }   
`;

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    position: sticky;
    z-index: 10000;
    top: 0;
    margin: 10px 0 10px;
`;

const Wrap = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
    border-top: 1px #e8e8e8 solid; 
    border-bottom: 1px #e8e8e8 solid; 
    background-color: white;
`;

const CategoryText = styled.span`
    position: relative;
    width: max-content;
    font-weight: bold;
    letter-spacing: -.67px;
    line-height: 50px;
    &::after {
        position: absolute;
        content: '${props => props.category}';
        color: transparent;
        left: 0;
        line-height: 48px;
        border-bottom: 3px solid ${props => props.theme.palette.yellow};
    }
`;

const StyledArrowIcon = styled(ArrowIcon)`
    width: 30px;
    cursor: pointer;
    transition: transform 250ms ease-out;
    ${props => props.open && 
        css 
            `transform: rotate(-180deg);`   
    }
`;

const RefreshIcon = styled.img`
    cursor: pointer;
`;

const CategoryContainer = styled.div`
    overflow: hidden; 
`;

const CategoryWrap = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    padding: 15px 0;
    background-color: #F4F4F4;
    animation: ${DrawIn} 0.3s ease-out;
`;

const Category = styled.li`
    text-align: center;
    font-size: 14px;
    color: #707070;
    list-style: none;
    letter-spacing: -0.23px;
    cursor: pointer;
`;

export default CategoryBar;