import React, { useEffect, useState } from 'react';
import DaumPostcode from "react-daum-postcode";
import styled from 'styled-components';
import { Grid, Input, Button } from '../../elements';

const { kakao } = window;

const postCodeStyle = {
    display: "block",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: "10",
};

const KakaoMap = (props) => {
    const [isAddress, setIsAddress] = useState("제주특별자치도 제주시 첨단로 242");
    const [isPopupOpen, setIsPopupOpen] = useState(false)

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
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };  

        // 지도를 생성합니다    
        var map = new kakao.maps.Map(mapContainer, mapOption); 

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
            imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
           
        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(isAddress, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                new kakao.maps.Marker({
                    map: map,
                    position: coords,
                    image: markerImage,
                });

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
        });    
    }, [isAddress]);

    
  
    return (
        <Grid
            is_flex
            is_column
            // height="calc(100vh - 100px)"
            padding="0 0 16px 0"
            gap="20px"
        >
            <Grid
                is_flex
                justify="space-between"
            >
                <AddressBox onClick={openPostCode}>{isAddress}</AddressBox>
                <Button 
                    text="검색"
                    background="#FFBB00"
                    color="white"
                    radius="10px"
                    width="60px"
                    padding="5px"
                />
            </Grid>
            <Grid position="relative" is_flex justify="center">
                {isPopupOpen && <DaumPostcode  style={postCodeStyle} onComplete={handleComplete} />}
                <MapContainer id="map" />
            </Grid>
        </Grid>
    )
}

const MapContainer = styled.div`
    width: 100%;
    height: calc(100vh - 165px);
`;

const AddressBox = styled.div`
    width: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-bottom: 2px black solid;
`;

export default KakaoMap;