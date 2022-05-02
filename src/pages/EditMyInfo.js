import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import LocationBar from '../components/LocationBar';

import { Grid, Input } from '../elements/index';
import { setPreview } from '../redux/modules/user';

const EditMyInfo = (props) => {
    const dispatch = useDispatch();
    const preview = useSelector(state => state.user.preview);
    
    const inputRef = useRef();
    
    const selectFile = (e) => {
        let reader = new FileReader();

        reader.onload = function(e) {
            dispatch(setPreview(e.target.result));
        }
        reader.readAsDataURL(inputRef.current.files[0]);
    };

    return (
        <>
            <LocationBar title="마이페이지"/>
            <Grid
                padding="0 16px"
                height="calc(100vh - 60px)"
                is_flex
                is_column
                justify="center"
                gap="25px"
            >
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
                <Input
                    placeholder="닉네임"
                    padding="10px"
                />
                <Input
                    placeholder="소개"
                    padding="10px"
                />
                <Input
                    placeholder="거주지"
                    padding="10px"
                />
            </Grid>
        </>
    );
};

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

export default EditMyInfo;