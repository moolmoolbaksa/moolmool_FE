import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid } from '../../elements/index';

const TextArea = (props) => {
    const [inputVal, setInputVal] = useState('');
    
    const writeText = (e) => {
        setInputVal(e.target.value)
    };

    useEffect(() => {
        if(inputVal.length > 30){
            setInputVal(inputVal.substring(0, 30));
        }
    }, [inputVal]);
    
    return (
        <Grid
            position="relative"
        >
            <MultiInput 
                onChange={writeText}
                value={inputVal}
                placeholder="소개를 적어주세요!"
            />
            <TextLength>{inputVal.length}/30</TextLength>
        </Grid>
    );
};

const MultiInput = styled.textarea`
    width: 100%;
    height: 100px;
    position: relative;
    resize: none;
    outline: none;
    
    &::placeholder {
        font-size: 20px;
        text-align: center;
        letter-spacing: -0.67px;
        padding: 30px
    }
`;

const TextLength = styled.div`
    position: absolute;
    bottom: 10px;
    right: 5px;
`
export default TextArea;