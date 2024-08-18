import React, { useEffect, useState } from 'react';
import {NaverMap, Marker, useNavermaps, Container as MapDiv, Circle} from "react-naver-maps";
import { faCoffee, faHamburger, faLocationDot, faPills, faStore } from '@fortawesome/free-solid-svg-icons';
import ReactDOMServer from 'react-dom/server';
import Icon from './Icon';

const Map = ({markers, hiddenType, center}) => {
  const navermaps = useNavermaps();
  const [markerIcon, setMarkerIcon] = useState([]);

  useEffect(() => {
    if (navermaps) {
      const icons = {
        LOCATION: ReactDOMServer.renderToString(<Icon icon={faLocationDot} color="#000000" backgroundColor="#00ff0000" size={90} />),
        CAFE: ReactDOMServer.renderToString(<Icon icon={faCoffee} color="#FFFFFF" backgroundColor="#A37B7B" size={30} />),
        FOOD: ReactDOMServer.renderToString(<Icon icon={faHamburger} color="#FFFFFF" backgroundColor="#F29979" size={30} />),
        MART: ReactDOMServer.renderToString(<Icon icon={faStore} color="#FFFFFF" backgroundColor="#F279BC" size={30} />),
        PHARMACY: ReactDOMServer.renderToString(<Icon icon={faPills} color="#FFFFFF" backgroundColor="#87C0CB" size={30} />),
      }
      setMarkerIcon(icons);
    }
  }, [navermaps]);

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