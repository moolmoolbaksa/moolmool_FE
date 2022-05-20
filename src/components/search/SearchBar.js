import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { api as searchActions, resetSearchList } from '../../redux/modules/search';
import { ReactComponent as SearchIcon } from '../../images/돋보기.svg';
import { Text, Grid } from '../../elements/index';

const SearchBar = (props) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
        dispatch(resetSearchList());
    }, []);

    const onEnter = (e) => {
        if(e.keyCode === 13){
            if(!search) return;
			dispatch(searchActions.getSearchApi(search));
            setSearch('');
            return;
		};
	};

    const onSubmit = (e) => {
        if(!search) return;
        dispatch(searchActions.getSearchApi(search));
        setSearch('');
	};

    return (
        <Container>
            <Grid flex gap="10px">
                <StyledInput 
                    type="search"
                    ref={inputRef}
                    onKeyDown={onEnter}
                    onChange={(e) => {setSearch(e.target.value)}}
                    value={search}
                    placeholder='검색어를 입력해 주세요.'
                />
                <StyledSearchIcon width="24" height="24" onClick={onSubmit}/>
            </Grid>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;
    padding: 0px 16px 18px;
    & span {
        text-indent: -9999;
        font-size: 25px;
        color: black;
        cursor: pointer;
    };
`;

const StyledInput = styled.input`
    background-color: #f5f5f5;
    border: none;
    font-size: 16px;
    padding: 8px 20px;
    border-radius: 50px;
    outline: none;
    flex-grow: 1;

    &::placeholder {
        color: #c4c4c4;
        letter-spacing: -.67px;
        word-spacing: -.67px;
    };
`;

const StyledSearchIcon = styled(SearchIcon)`
    cursor: pointer;
`;

export default SearchBar;