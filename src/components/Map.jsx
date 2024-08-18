import React, { useEffect, useState } from 'react';
import {NaverMap, Marker, useNavermaps, Container as MapDiv, Circle} from "react-naver-maps";
import { faCoffee, faHamburger, faLocationDot, faPills, faStore } from '@fortawesome/free-solid-svg-icons';

const Map = ({markers, hiddenType, center}) => {
  const navermaps = useNavermaps();
  const [markerIcon, setMarkerIcon] = useState([]);

  // FontAwesome 아이콘을 SVG로 변환하여 상태에 저장
  useEffect(() => {
    if (navermaps) {
      const icons = {
        LOCATION: iconSVG(faLocationDot, '#000000', '#00ff0000', '90'),
        CAFE: iconSVG(faCoffee, '#FFFFFF', '#A37B7B', '30'),
        FOOD: iconSVG(faHamburger, '#FFFFFF', '#F29979', '30'),
        MART: iconSVG(faStore, '#FFFFFF', '#F279BC', '30'),
        PHARMACY: iconSVG(faPills, '#FFFFFF', '#87C0CB', '30')
      }
      setMarkerIcon(icons);
    }
  }, [navermaps]);

  const iconSVG = (icon, color, backgroundColor, size) => {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -100 400 580" width="${size}" height="${size}">
          <circle cx="200" cy="200" r="280" fill="${backgroundColor}" fill-opacity="0.8" />
          <path fill="${color}" d="${icon.icon[4]}" transform="translate(12, 12) scale(0.6)" />
        </svg>
      `;
  }

  return (
    <MapDiv style={{ width: "100%", height: "700px", borderRadius: "10px", overflow: "hidden"}}>
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
              anchor: new navermaps.Point(30, 65),
            }}
          />
        )}
        
        {/* 현재 위치 중심으로 원 표시 */}
        <Circle 
          center={new navermaps.LatLng(center.latitude, center.longitude)}
          radius={300}
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