import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Text, Grid } from '../../elements/index';
import { resetSearchHistory } from '../../redux/modules/search';
import SearchWord from './SearchWord';

const SearchHistory = (props) => {
    const dispatch = useDispatch();
    const search_history = useSelector(state => state.search.search_history);
    
    const onDelete = () => {
        dispatch(resetSearchHistory());
    };

    if(!search_history.length){
        return null;
    };

    return (
        <Container>
            <Grid flex>
                <Text 
                    text="최근검색어"
                    size="13px"
                    color="#666666"
                    width="max-content"
                />
                <DeleteBtn onClick={onDelete}>전체삭제</DeleteBtn>
            </Grid>
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
    padding: 0px 16px 17px;
`;

const HistoryWrap = styled.div`
    width: 100%;
    display: flex;
    gap: 7px;
    overflow-x: scroll;
    white-space: nowrap;
    flex-wrap: nowrap;
    padding-top: 10px;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    };

    scroll-behavior: smooth;
`;

const DeleteBtn = styled.div`
    font-size: 12px;
    width: max-content;
    color: #666666;
    background-color: #E8E8E8;
    padding: 5px 9px;
    border-radius: 20px;
    cursor: pointer;
`;

export default SearchHistory;