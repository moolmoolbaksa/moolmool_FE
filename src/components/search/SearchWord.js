import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { api as searchActions, deleteSearchHistory,  } from '../../redux/modules/search';

const SearchWord = ({word}) => {
    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch(deleteSearchHistory(word));
    };
    
    const onSearch = () => {
        dispatch(searchActions.getSearchApi(word));
    };

    return (
        <SearchLabel>
            <Word onClick={onSearch}>{word}</Word>
            <span 
                className="material-symbols-outlined"
                onClick={onDelete}
            >
                close
            </span>
        </SearchLabel>
    );
};

const SearchLabel = styled.div`
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.palette.yellow};
    padding: 5px 15px 5px 15px;
    border-radius: 20px;
    gap: 5px;

    & span {
        font-size: 14px;
        cursor: pointer;
    }
`;

const Word = styled.div`
    font-size: 12px;
    cursor: pointer;
`;  

export default SearchWord;