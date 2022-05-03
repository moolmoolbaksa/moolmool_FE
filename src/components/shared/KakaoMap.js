import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import DaumPostcode from "react-daum-postcode";
import { ReactComponent as InfoWindow } from "../../images/인포윈도우.svg";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { setAddress } from "../../redux/modules/user";

const { kakao } = window;

const KakaoMap = () => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        center: {
            lat: 33.450701,
            lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
    })

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude, // 위도
                            lng: position.coords.longitude, // 경도
                        },
                        isLoading: false,
                    }))
                },
                (err) => {
                    setState((prev) => ({
                        ...prev,
                        errMsg: err.message,
                        isLoading: false,
                    }))
            }
            )
        } else {
            setState((prev) => ({
                ...prev,
                errMsg: "위치 서비스를 사용할수 없어요..",
                isLoading: false,
            }))
        }
    }, []);

    useEffect(() => { 
        throttle(); 
    }, [state]);
    
    const throttle = 
        _.debounce(() => {
            let geocoder = new kakao.maps.services.Geocoder();
            let coord = new kakao.maps.LatLng(state.center.lat, state.center.lng);
            let callback = function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    console.log(result)
                    const road_address = result[0].road_address?.address_name;
                    const general_address = result[0].address?.address_name;
                    // const is_address = general_address ? general_address : '지번주소를 알 수 없어요.';
                    dispatch(setAddress({road_address, general_address}));
                }
            }
            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        }, 500);

    return (
        <>
            <Map
                center={state.center}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                }}
                level={3}
                onCenterChanged={(map) => setState({
                    level: map.getLevel(),
                    center: {
                        lat: map.getCenter().getLat(),
                        lng: map.getCenter().getLng(),
                    }
                })}
            >
                {!state.isLoading && (
                    <MapMarker position={state.center} />
                )}
                <Wrap>
                    <MapInfo>{state.errMsg ? state.errMsg : "지도를 움직여 위치를 설정하세요."}</MapInfo>
                </Wrap>
            </Map>
        </>
    )
};

const Wrap = styled.div`
    position: absolute;
    z-index: 100;
    width: 100%;
    top: 10px;
    display: flex;
    justify-content: center;
`;

const MapInfo = styled.div`
    top: 0px;
    text-align: center;
    display: inline-block;
    background-color: rgb(255, 202, 57);
    letter-spacing: -1px;
    line-height: 19px;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
`;

export default KakaoMap;