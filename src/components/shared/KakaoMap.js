import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components";

import DaumPostcode from "react-daum-postcode";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { setAddress } from "../../redux/modules/user";
import { Grid, Text, Button } from "../../elements/index";
import { ReactComponent as LocationIcon } from "../../images/좌표.svg";
import { ReactComponent as GlassIcon } from "../../images/돋보기.svg";

const { kakao } = window;

const postCodeStyle = {
    display: "block",
    position: "relative",
    width: "100%",
    height: "100%",
    zIndex: "1000",
    zndex: "10000",
};

const KakaoMap = () => {
    const dispatch = useDispatch();
    const locationRef = useRef();
    
    const [state, setState] = useState({
        center: "",
        errMSg: null,
    });

    const [isAddress, setIsAddress] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPostCode = () => {
        setIsPopupOpen(true);
    };

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setIsAddress(fullAddress);
        setIsPopupOpen(false);
    };
    
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
        }, 500));

        var geocoder = new kakao.maps.services.Geocoder();

        if(isAddress){
            geocoder.addressSearch(isAddress, function(result, status) {

                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {

                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    // new kakao.maps.Marker({
                    //     map: map,
                    //     position: coords,
                    //     // image: markerImage,
                    // });
                    marker.setPosition(coords);
                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                } 
            });
        };

        locationRef.current.addEventListener('click', () => {
            // map.setCenter(state.center);
            window.location.reload();
        });
    }, [isAddress]);
    
    return (
        <>
            <MapContainer>
                <Map
                    id="map"
                >
                    <Wrap>
                        <MapInfo>{state.errMSg ? state.errMSg : "지도를 움직여 위치를 설정하세요."}</MapInfo>
                    </Wrap>
                    {/* {isPopupOpen && <StyledPost  style={postCodeStyle} onComplete={handleComplete} />} */}
                </Map>
            </MapContainer>
            <Grid
                padding="0 16px"
            >
                <SearchAddress 
                    onClick={openPostCode}
                >
                    지번, 도로명, 건물명으로 검색
                    <GlassIcon />
                </SearchAddress>
                <NowLocation ref={locationRef}>
                    <LocationIcon />
                    <Text 
                        text="현재 위치로 설정하기"
                        letterSpacing="-1px"
                        wordSpacing="-1px"
                        bold="500"
                    />
                </NowLocation>
            </Grid>
            {isPopupOpen && <Grid 
                                height="100vh"
                                position="absolute"    
                                width="100%" 
                                is_flex
                                is_column
                            >
                                <StyledPost  
                                    style={postCodeStyle} 
                                    onComplete={handleComplete} 
                                />
                                <Button 
                                    text="닫기"
                                    background="#ffca39"
                                    size="18px"
                                    height="60px"
                                    bold="bold"
                                    onClick={() => {setIsPopupOpen(false)}}
                                
                                />
                            </Grid>
            }
        </>
    );
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

const StyledPost = styled(DaumPostcode)`
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }
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

const SearchAddress = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    height: 50px;
    padding: 0px 15px;
    background: rgb(245, 245, 245);
    margin: 0 0 16px 0;
    font-size: 16px;
    color: rgb(157,157,157);
    line-height: 22.6px;
    font-weight: 500;
    letter-spacing: -1px;
    border-radius: 5px;
    cursor: pointer;
`;

const NowLocation = styled.div`
    display: flex;
    cursor: pointer;
`;

export default KakaoMap;