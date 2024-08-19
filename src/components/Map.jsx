/* 
Date: 2024.08.17
Description: Naver Map을 표시하고, 마커와 원을 렌더링하는 컴포넌트 구현
Function
  - Naver Maps API를 사용하여 지도와 마커 표시
  - 서버에서 받아온 마커 데이터와 필터링된 마커를 지도에 표시
  - 현재 위치를 중심으로 원을 표시하여 범위 시각화
  - 아이콘의 스타일과 형태를 정의하여 마커에 적용 (FontAwesome 아이콘 사용)
Author: 이슬기
*/

import React, { useEffect, useState } from 'react';
import {NaverMap, Marker, useNavermaps, Container as MapDiv, Circle} from "react-naver-maps";
import { faCoffee, faHamburger, faLocationDot, faPills, faStore } from '@fortawesome/free-solid-svg-icons';
import ReactDOMServer from 'react-dom/server'; //리액트 컴포넌트를 HTML 문자열로 렌더링하는 데 사용되는 라이브러리. 아이콘을 SVG로 변환하여 지도 마커에 사용
import Icon from './Icon';

const Map = ({markers, hiddenType, center}) => {
  const navermaps = useNavermaps(); // 네이버 맵 객체 가져오는 훅
  const [markerIcon, setMarkerIcon] = useState([]); // 마커 아이콘 저장

  // 네이버 맵 객체가 초기화되면 아이콘 생성하여 상태에 저장
  useEffect(() => {
    if (navermaps) {
      // 아이콘 생성 - 각 타입별 SVG 아이콘 생성하여 문자열로 반환
      const icons = {
        LOCATION: ReactDOMServer.renderToString(<Icon icon={faLocationDot} color="#000000" backgroundColor="#00ff0000" size={90} />),
        CAFE: ReactDOMServer.renderToString(<Icon icon={faCoffee} color="#FFFFFF" backgroundColor="#A37B7B" size={30} />),
        FOOD: ReactDOMServer.renderToString(<Icon icon={faHamburger} color="#FFFFFF" backgroundColor="#F29979" size={30} />),
        MART: ReactDOMServer.renderToString(<Icon icon={faStore} color="#FFFFFF" backgroundColor="#F279BC" size={30} />),
        PHARMACY: ReactDOMServer.renderToString(<Icon icon={faPills} color="#FFFFFF" backgroundColor="#87C0CB" size={30} />),
      }
      setMarkerIcon(icons);
    }
  }, [navermaps]); // navermaps가 변경될 때마다 useEffect 실행

  return (
    <MapDiv style={{ width: "100%", height: "700px", borderRadius: "10px", overflow: "hidden"}}>
      {/* navermaps 존재할 때만 <NaverMap> 컴포넌트 렌더링 */}
      {navermaps && (
        <NaverMap defaultCenter={new navermaps.LatLng(center.latitude, center.longitude)} defaultZoom={16}>

        {/* 현재 위치 마커 */}
        {markerIcon && (
          <Marker 
            position={new navermaps.LatLng(center.latitude, center.longitude)}
            title='유어픽'
            icon={{
              content: markerIcon.LOCATION,
              origin: new navermaps.Point(0, 0),
              anchor: new navermaps.Point(30, 65), // 마커 기준점 설정
            }}
          />
        )}
        
        {/* 현재 위치 중심으로 원 표시 */}
        <Circle 
          center={new navermaps.LatLng(center.latitude, center.longitude)}
          radius={300} // 원 반지름 설정
          fillColor={'rgba(0, 0, 0, 0.3)'} // 불투명 검정
          fillOpacity={0.3} // 투명도
          strokeColor={'#000000'} // 경계선 색
          strokeOpacity={0.5} // 경계선 투명도
          strokeWeight={0.5} // 경계선 두께
        />

        {/* 필터링된 마커 표시 */}
        {markers
          .filter(marker => !hiddenType.includes(marker.type)) // 보이지 않는 타입의 마커는 표시되지 않음
          .map((marker, index) => (
            <Marker 
              key={index}
              position={new navermaps.LatLng(marker.lat, marker.lng)}
              title={marker.name}
              icon={{
                content: markerIcon[marker.type] || markerIcon.LOCATION,
                origin: new navermaps.Point(0, 0),
                anchor: new navermaps.Point(15, 30),
              }}
            />
          ))}
      </NaverMap>
      )}
    </MapDiv>
  )
}

export default Map;