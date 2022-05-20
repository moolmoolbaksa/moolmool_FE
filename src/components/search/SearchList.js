import React from 'react';
import styled from 'styled-components';

import { Grid } from '../../elements/index';
import SearchItem from './SearchItem';
import { useSelector } from 'react-redux';

const SearchList = (props) => {
    const {search_list, search_word} = useSelector(state => state.search);
   
    if(!search_list.length){
        return (
            <Container className='empty'>
                {!search_word
                    ?   <Wrap>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                            <Text>검색어를 입력해 주세요.</Text> 
                        </Wrap>
                    :   <Wrap>
                            <span className="material-symbols-outlined">
                                error
                            </span>
                            <Grid is_flex is_column gap="3px">
                                <Text>검색 결과가 없습니다.</Text> 
                                <Text>다른 검색어를 입력해주세요.</Text>
                            </Grid>
                        </Wrap>
                }
            </Container>
        );
    };

    return (
        <Container className='border'>
            <span>총 <span className='bold'>{search_list.length}개</span>의 결과가 검색되었습니다.</span>
            <ListWrap>
                {search_list.map((v, i) => {
                    return <SearchItem 
                                key={i}
                                {...v}
                            />
                })}
            </ListWrap>
        </Container>
    );
};

const Container = styled.div`
    flex-grow: 1;
    padding: 15px 16px 20px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    };
    scroll-behavior: smooth;
 
    &.border {
        border-top: 1px #e8e8e8 solid;
    };
    
    &.empty {
        display: flex;
        justify-content: center;
        align-items: center;
    };

    span {
        font-size: 13px;
        color: #9D9D9D;
        word-spacing: -1px;
    };
    
    span.bold {
        font-size: 14px;
        font-weight: bold;
        color: black;
        word-spacing: -1px;
    };
`;

const ListWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 15px;
    gap: 20px;
`;

const Wrap = styled.div`
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    overflow: hidden;
    span {
        font-size: 100px;
        text-align: center;
    };
`;

const Text = styled.div`
    font-size: 18px;
    color: #9d9d9d;
    word-spacing: -2px;
    letter-spacing: -1px;
    text-align: center;
`;

export default SearchList;