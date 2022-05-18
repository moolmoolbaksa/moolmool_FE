import React from 'react';
import styled from 'styled-components';

import { Text } from '../../elements/index';
import SearchItem from './SearchItem';
import { useSelector } from 'react-redux';

const SearchList = (props) => {
    const {search_list, search_word} = useSelector(state => state.search);
   
    if(!search_list.length){
        return (
            <Container>
                {search_word
                    ?   <EmptyInfo>'{search_word}'에 대한 검색결과가 없어요..</EmptyInfo>
                    :   <EmptyInfo>검색을 해주세요.</EmptyInfo>
                }
            </Container>
        );
    };

    return (
        <Container>
            <Text 
                text={`'${search_word}' 검색결과`}
                bold="bold"
                size="18px"
            />
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
    height: 100%;
    background-color: white;
    margin-top: 7px;
    flex-grow: 1;
    padding: 15px 16px 20px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    };
`;

const ListWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 15px;
    gap: 20px;
`;

const EmptyInfo = styled.div`
    border: 2px ${props => props.theme.palette.yellow} solid;
    border-radius: 5px;
    padding: 20px 10px;
    text-align: center;
`;

export default SearchList;