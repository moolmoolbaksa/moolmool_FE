import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import KakaoMap from '../../components/shared/KakaoMap';

import { Grid, Text, Button } from '../../elements/index';
import { api as userActions } from '../../redux/modules/user';

const Address = (props) => {
    const dispatch = useDispatch();
    const {road_address, general_address} = useSelector(state => state.user.address);
    const onUpdateAddress = () => {
        dispatch(userActions.setFirstUserInfoApi(general_address));
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
                <Text 
                    text="내 위치 설정"
                    size="24px"
                    letterSpacing="-.96px"
                    bold="bold"
                    textAlign="center"
                    />
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
                    radius="5px"
                    background="rgb(255,202,57)"
                    bold="bold"
                    size="18px"
                    color="black"
                    text="이 위치로 설정"
                />
            </Grid>
        </Grid>
    );
};

const MapContainer = styled.div`
    height: 100%;
    max-height: 355px;
    width: 100%;
    margin-bottom: 18px;
    position: relative;

`;

export default Address;