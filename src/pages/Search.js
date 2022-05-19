import React from 'react';
import styled from 'styled-components';

import SearchBar from '../components/search/SearchBar';
import SearchHistory from '../components/search/SearchHistory';
import SearchList from '../components/search/SearchList';
import TabBar from '../components/TabBar';
import { Grid } from '../elements/index';
const Search = (props) => {
    return (
        <Container>
            <SearchBar />
            <SearchHistory />
            <Grid padding="0 16px" height="100%">
                <SearchList />
            </Grid>
            <TabBar position="false"/>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
`;

export default Search;