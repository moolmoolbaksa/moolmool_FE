import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import LocationBar from '../components/LocationBar';

import { Grid, Text } from '../elements/index';
import { setPreview } from '../redux/modules/user';
import { ReactComponent as LocationIcon } from '../images/좌표.svg';
import { api as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';

const EditMyInfo = (props) => {
    const dispatch = useDispatch();
    const {nickname, storeInfo, address} = useSelector(state => state.user.user_info);
    const profile = useSelector(state => state.user.user_info.profile);
    const preview = useSelector(state => state.user.preview);
    const inputRef = useRef();

    const [editInfo, setEditInfo] = useState({
        nickname,
        storeInfo: storeInfo ? storeInfo : '',
        address,
        profile: '',
    });

    const selectFile = (e) => {
        let reader = new FileReader();
        setEditInfo({
            ...editInfo,
            profile: inputRef.current.files[0]
        });
        reader.readAsDataURL(inputRef.current.files[0]);
        reader.onload = function(e) {
            dispatch(setPreview(e.target.result));        
        };
    };

    const onChangeNickname = (e) => {
        if(e.target.value.length > 5){
            setEditInfo({
                ...editInfo,
                nickname: e.target.value.substring(0, 5)
            });
            return;
        }
        setEditInfo({
            ...editInfo,
            nickname: e.target.value
        });
    };

    const onChangeStoreInfo = (e) => {
        if(e.target.value.length > 30){
            setEditInfo({
                ...editInfo,
                storeInfo: e.target.value.substring(0, 30)
            });
            return;
        }
        setEditInfo({
            ...editInfo,
            storeInfo: e.target.value
        });
    };
    
    const onEditMyInfo = () => {
        const formData = new FormData();
        for(let key in editInfo){
            formData.append(key, editInfo[key]);
        }
        dispatch(userActions.updateMyInfoApi(formData));
    };
    
    return (
        <>
            <LocationBar title="마이페이지"/>
            <Grid
                padding="40px 16px 0"
                height="calc(100vh - 60px)"
                is_flex
                is_column
                // justify="center"
                gap="25px"
            >
                <FileBox>
                    <Preview 
                        src={preview || profile}
                    />
                    <Wrap>
                        <input 
                            onChange={selectFile}
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            id="profile_img" 
                        />
                        <label htmlFor='profile_img'></label>
                        <Round onChange={selectFile}>
                            <span className="material-symbols-outlined">
                                android_camera
                            </span>
                        </Round>
                    </Wrap>
                </FileBox>
            
                <Grid>
                <Grid flex>
                        <Text 
                            text="닉네임"
                            size="16px"
                            margin="0 0 5px"
                            color="#9D9D9D"
                        />
                        <TextLength>{editInfo.nickname.length}/5</TextLength>
                    </Grid>
                    <Input
                        type="text"
                        onChange={onChangeNickname}
                        value={editInfo.nickname}
                        padding="10px"
                    />
                </Grid>
                <Grid>
                    <Text 
                        text="거주지"
                        size="16px"
                        margin="0 0 5px"
                        color="#9D9D9D"
                        />
                    <Grid
                        flex
                    >
                        <Input
                            type="text"
                            disabled
                            placeholder={address}
                            padding="10px"
                        />
                        <StyledLocationIcon width="30" height="30" onClick={() => {history.push({pathname: '/address', state:{is_edit: true}})}}/>
                    </Grid>
                </Grid>
                <Grid>
                    <Grid flex>
                        <Text 
                            text="보따리 소개"
                            size="16px"
                            margin="0 0 5px"
                            color="#9D9D9D"
                        />
                        <TextLength>{editInfo.storeInfo.length}/30</TextLength>
                    </Grid>
                    <Input
                        type="text"
                        onChange={onChangeStoreInfo}
                        value={editInfo.storeInfo}
                        placeholder={!editInfo.storeInfo ? '나의 보따리 소개를 적어주세요.' : ''}
                        padding="10px"
                    />
                </Grid>
            </Grid>
            <Button
                onClick={onEditMyInfo}
            >
                완료
            </Button>
        </>
    );
};

const FileBox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 200px;
`;

const Wrap = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 200px;

    & input {
        display: none;
    }

    & label {
        position: absolute;
        z-index: 1;
        width: 200px;
        height: 200px;
        border-radius: 200px;
        cursor: pointer;
        background-color: transparent;
    }
`;

const Preview = styled.div`
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 200px;
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

const Round = styled.div`
    position: absolute;
    right: 10px;
    bottom: 15px;
    width: 35px;
    height: 35px;
    border-radius: 50px;
    background-color: #9D9D9D;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    & span {
        color: white;
        text-indent: -9999;
        font-size: 25px;
    }
`;

const Input = styled.input`
    width: 100%;
    border: 1px #9D9D9D solid;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
`;

const TextLength = styled.div`
    color: #9D9D9D;
    font-size: 14px;
`;

const StyledLocationIcon = styled(LocationIcon)`
    width: 50px;
    cursor: pointer;
`;

const Button = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #ffca39;
    padding: 16px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
`;

export default EditMyInfo;