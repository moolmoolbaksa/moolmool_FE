import React, { useEffect } from 'react';
import styled from 'styled-components';

const { kakao } = window;

const KakaoMap = (props) => {
    
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
              });
            
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667)
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
           
            var message = '<p>중심 좌표는 위도 ' + latlng.getLat() + ', 경도 ' + latlng.getLng() + '입니다</p>';
        
            var resultDiv = document.getElementById('result');
            resultDiv.innerHTML = message;
        });
    }, [])
    
    return (
        <>
        <MapContainer id="map">
            
        </MapContainer>
        <div id="result">zz</div>
        </>
        
    );
};

const MapContainer = styled.div`
    width: 100%;
    height: 500px;
`

export default KakaoMap;