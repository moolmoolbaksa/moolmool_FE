import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import KakaoMap from '../components/shared/KakaoMap';

import { Grid } from '../elements/index';
import { setPreview } from '../redux/modules/user';
import { api as userApi } from '../redux/modules/user';

const FirstSet = (props) => {
    const dispatch = useDispatch();
    
    const [inputVal, setInputVal] = useState('');
    
    const preview = useSelector(state => state.user.preview);
    
    const inputRef = useRef();
    
    useEffect(() => {
        if(inputVal.length > 30){
            setInputVal(inputVal.substring(0, 30));
        }
    }, [inputVal]);

    const selectFile = (e) => {
        let reader = new FileReader();

        reader.onload = function(e) {
            dispatch(setPreview(e.target.result));
        }
        reader.readAsDataURL(inputRef.current.files[0]);
    };

    const onWrite = (e) => {
        setInputVal(e.target.value);
    };

    const onSubmitClick = () => {
        dispatch(userApi.setFirstUserInfo(preview, inputVal));
    };

    return (
        <Container>
            {/* <StyledLink 
                to="/"
                onClick={onSubmitClick}
            >
                완료
            </StyledLink>
            <FileBox>
                <Preview 
                    src={preview}
                />
                <input 
                    onChange={selectFile}
                    ref={inputRef}
                    type="file"
                    id="profile_img" 
                />
                <label htmlFor='profile_img'></label>
            </FileBox>
            <Grid
                position="relative"
            >
                <MultiInput 
                    onChange={onWrite}
                    value={inputVal}
                    placeholder="소개를 적어주세요!"
                />
                <TextLength>{inputVal.length}/30</TextLength>
            </Grid> */}
            <KakaoMap />
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    width: 100%;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    float: right;
`

const FileBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 200px;

    & input {
        display: none;
    }

    & label {
        position: absolute;
        z-index: 1;
        width: 200px;
        height: 200px;
        border-radius: 200px;
        background-color: transparent;
    }
`;

const Preview = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 200px;
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

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

export default FirstSet;