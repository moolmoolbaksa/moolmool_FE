import React from 'react';
import styled from 'styled-components';

import SearchBar from '../components/search/SearchBar';
import SearchHistory from '../components/search/SearchHistory';
import SearchList from '../components/search/SearchList';

const Search = (props) => {
    return (
        <Container>
            <SearchBar />
            <SearchHistory />
            <SearchList />
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-flow: column nowrap;
`;

export default Search;