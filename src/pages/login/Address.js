import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import KakaoMap from '../../components/shared/KakaoMap';

import { Grid, Text, Button } from '../../elements/index';
import { history } from '../../redux/configureStore';
import { api as userActions, setAddress } from '../../redux/modules/user';
import { ReactComponent as ArrowIcon } from '../../images/화살표.svg';
import { getDistance } from '../../shared/distance';

const Address = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {road_address, general_address} = useSelector(state => state.user.address);
    // const latlng = useSelector(state => state.user.latlng);
   
    const onUpdateAddress = () => {
        if(location.state){
            // dispatch(userActions.setFirstUserInfoApi(general_address));
            history.goBack();
            return;
        };
        dispatch(userActions.setFirstUserInfoApi(general_address));
        history.replace('/welcome');
    };
    
    const onGoBack = () => {
        history.goBack();
        dispatch(setAddress(''));
    };

    return (
        <Grid
            height="100%"
            is_flex
            is_column
            justify="center"
            position="relative"
        >
            <Grid
                is_flex
                is_column
                gap="18px"
            >   
                <Grid
                    position="relative"
                    flex
                >
                    {location.state && <StyledArrowIcon onClick={onGoBack} width="30" height="30"/>}
                    <Text 
                        text="내 위치 설정"
                        size="24px"
                        letterSpacing="-.96px"
                        bold="bold"
                        textAlign="center"
                    />
                </Grid>
                <Grid
                    margin="0 0 18px 0"
                >
                    <Text 
                        text="물물박사는 지역기반 교환 서비스에요."
                        letterSpacing="-.56px"
                        bold="500"
                        textAlign="center"
                    />
                    <Text 
                        text="위치 정보를 입력해서 첫 교환을 시작해 보세요!"
                        letterSpacing="-.56px"
                        bold="500"
                        textAlign="center"
                    />
                </Grid>
            </Grid>
            <KakaoMap/>
            <Grid
                padding="0 16px"
            >
                <Grid
                    margin="20px 0px"
                    height="43px"
                >
                    {road_address && 
                        <>
                            <Text 
                                text={road_address}
                                size="20px"
                                letterSpacing="-1px"
                                bold="bold"
                            />
                            <Text 
                                text={`지번주소) ${general_address}`}
                                size="12px"
                                letterSpacing="-1px"
                                bold="500"
                                color="rgb(102, 102, 102)"
                            />
                        </>
                    }
                    {!road_address && 
                        <>
                            <Text 
                                text={general_address}
                                size="20px"
                                letterSpacing="-1px"
                                bold="bold"
                            />
                            <Text 
                                text=""
                                size="12px"
                                letterSpacing="-1px"
                                bold="500"
                                color="rgb(102, 102, 102)"
                            />
                        </>
                    }
                </Grid>
                <Button
                    onClick={onUpdateAddress}
                    height="50px"
                    background="yellow"
                    size="18px"
                    radius="5px"
                >{location.state ? '이 위치로 재설정' : "이 위치로 설정"}</Button>
            </Grid>
        </Grid>
    );
};

const StyledArrowIcon = styled(ArrowIcon)`
    position: absolute;
    left: 10px;
`;

export default Address;