import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Text } from '../../elements/index';
import SearchWord from './SearchWord';

const SearchHistory = (props) => {
    const search_history = useSelector(state => state.search.search_history);
    
    if(!search_history.length){
        return null;
    };

    return (
        <Container>
            <Text 
                text="최근검색어"
                size="13px"
                color="#666666"
            />
            <HistoryWrap>
                {search_history.map((v, i) => {
                    return  <SearchWord 
                                key={i}
                                word={v}
                            />
                })}
            </HistoryWrap>
        </Container>
    );
};

const Container = styled.div`
    padding: 0px 16px 15px;
    background-color: white;
`;

const HistoryWrap = styled.div`
    width: 100%;
    display: flex;
    gap: 7px;
    overflow-x: scroll;
    white-space: nowrap;
    flex-wrap: nowrap;
    padding-top: 10px;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    };

    scroll-behavior: smooth;
`;

export default SearchHistory;