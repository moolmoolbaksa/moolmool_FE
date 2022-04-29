import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import KakaoMap from '../components/KakaoMap';
import { setPreview } from '../redux/modules/image';

const FirstSet = (props) => {
    const dispatch = useDispatch();
    
    const inputRef = useRef();
    const preview = useSelector(state => state.image.src);
    
    const selectFile = (e) => {
        let reader = new FileReader();

        reader.onload = function(e) {
            dispatch(setPreview(e.target.result));
        }
        reader.readAsDataURL(inputRef.current.files[0]);
    };

    return (
        <Container>
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
            <KakaoMap />
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    width: 100%;
`;

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

export default FirstSet;