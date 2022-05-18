import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { history } from '../../redux/configureStore';
import { api as searchActions, resetSearchList } from '../../redux/modules/search';

const SearchBar = (props) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const inputRef = useRef();

    const onSubmit = (e) => {
		if(e.keyCode === 13){
            if(!search) return;
			dispatch(searchActions.getSearchApi(search));
            setSearch('');
		};
	};

    const onCancle = () => {
        dispatch(resetSearchList());
        history.push('/');
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <Container>
            <StyledInput 
                type="text"
                ref={inputRef}
                onKeyDown={onSubmit}
                onChange={(e) => {setSearch(e.target.value)}}
                value={search}
                placeholder='검색어를 입력해 주세요.'
            />
            <span 
                className="material-symbols-outlined"
                onClick={onCancle}
            >
                close
            </span>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 18px 16px;
    background-color: white;
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


export default SearchBar;