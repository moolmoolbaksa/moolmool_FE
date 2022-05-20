import React from 'react';
import styled from 'styled-components';

import SearchBar from '../components/search/SearchBar';
import SearchHistory from '../components/search/SearchHistory';
import SearchList from '../components/search/SearchList';
import LocationBar from '../components/LocationBar';

const Search = (props) => {
    return (
        <Container>
            <LocationBar title="검색"/>
            <SearchBar />
            <SearchHistory />
            <SearchList />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
`;

export default Search;