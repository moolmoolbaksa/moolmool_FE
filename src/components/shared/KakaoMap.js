import React, { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components";

// import { Map, MapMarker } from "react-kakao-maps-sdk";
import DaumPostcode from "react-daum-postcode";
import { ReactComponent as InfoWindow } from "../../images/인포윈도우.svg";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { setAddress } from "../../redux/modules/user";
import { Input, Grid, Text } from "../../elements/index";
import icon from '../../images/좌표.png'

const { kakao } = window;

const KakaoMap = () => {
    const dispatch = useDispatch();
    const locationRef = useRef();
    
    const [state, setState] = useState({
        center: "",
        errMSg: null,
    });

    console.log(state)

    useEffect(() => {
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = { 
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };
    
        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption); 

        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                
                var locPosition = new kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                map.setCenter(locPosition);
                setState(v => ({...v, center: locPosition}));
            });
            
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
            setState(v => ({...v, errMSg: '실시간 위치를 파악할 수 없어요.'}))
            map.setCenter(locPosition);
        }

        var marker = new kakao.maps.Marker({ 
            // 지도 중심좌표에 마커를 생성합니다 
            position: map.getCenter() 
        }); 
        // 지도에 마커를 표시합니다
        marker.setMap(map);

        kakao.maps.event.addListener(map, 'center_changed', function() {
            // 지도의 중심좌표를 얻어옵니다 
            var latlng = map.getCenter(); 
            marker.setPosition(latlng);
        });

        kakao.maps.event.addListener(map, 'bounds_changed', _.throttle(() => {
            let latlng = map.getCenter(); 
            let geocoder = new kakao.maps.services.Geocoder();
            let coord = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng());
            let callback = function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const road_address = result[0].road_address?.address_name;
                    const general_address = result[0].address?.address_name;
                    dispatch(setAddress({road_address, general_address}));
                }
            }
            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        }, 500))

        locationRef.current.addEventListener('click', () => {
            // map.setCenter(state.center);
            window.location.reload();
        });
        
    }, [])
    
    return (
        <>
            <MapContainer>
                <Map
                    id="map"
                >
                    <Wrap>
                        <MapInfo>{state.errMSg ? state.errMSg : "지도를 움직여 위치를 설정하세요."}</MapInfo>
                    </Wrap>
                </Map>
            </MapContainer>
            <Grid
                padding="0 16px"
            >
                <Input 
                    height="50px"
                    padding="18px 15px"
                    bg="rgb(245, 245, 245)"
                    margin="0 0 16px 0"
                    placeholder="지번, 도로명, 건물명으로 검색"
                />
                <NowLocation ref={locationRef}>
                    <img 
                        src={icon}
                        alt="좌표 아이콘"
                        width="18px"
                        height="18px"
                    />
                    <Text 
                        text="현재 위치로 설정하기"
                        letterSpacing="-1px"
                        wordSpacing="-1px"
                        bold="500"
                    />
                </NowLocation>
            </Grid>
        </>
    )
};
const MapContainer = styled.div`
    height: 100%;
    max-height: 355px;
    width: 100%;
    margin-bottom: 18px;
    position: relative;

`;
const Map = styled.div`
    height: 100%;
`;

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

const NowLocation = styled.div`
    display: flex;
    cursor: pointer;
`;

export default KakaoMap;