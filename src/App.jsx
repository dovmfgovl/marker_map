/* 
Date: 2024.08.17
Description: Naver Map과 필터 버튼을 포함한 메인 애플리케이션 컴포넌트 구현
Function
  - Naver Maps API로 지도 표시
  - 서버에서 위치 마커 데이터를 가져와 지도에 표시
  - 필터 버튼으로 마커 타입을 토글하여 숨기기/표시하기
Author: 이슬기
*/
import { NavermapsProvider } from "react-naver-maps";
import axios from 'axios';
import Map from './components/Map';
import FilterButton from './components/FilterButton';
import { useEffect, useState } from "react";

// .env 파일에서 네이버 맵 API 키 가져옴
const NAVER_MAPS_API_KEY= process.env.REACT_APP_NAVER_MAPS_API_KEY;

function App() {
  const [markers, setMarkers] = useState([]); // 지도에 표시할 마커 데이터 저장
  const [hiddenType, sethiddenType] = useState([]); // 숨겨진 마커 타입들 저장
  const [myLocation, setMyLocation] = useState({latitude: 37.5358994, longitude: 126.8969627}); // 현재 위치 관리

  // 컴포넌트가 처음 렌더링될 때 마커 데이터를 가져오는 비동기 함수 호출
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get("https://apiy.yourpick.co.kr/mission/test001"); // 서버에서 마커 데이터 비동적으로 가져오기
        setMarkers(response.data); // markers 상태 업데이트
      } catch (error) {
        console.error("marker 가져오기 실패", error);
      }
    };

    fetchMarkers();
  }, []); // 컴포넌트가 처음 렌더링될 떄 한 번만 실행

  // 특정 타입의 마커를 숨기거나 다시 보이게 하는 함수
  const toggleType = (type) => { 
    sethiddenType(prevHiddenType =>
      prevHiddenType.includes(type) 
        ? prevHiddenType.filter(t => t !== type) // 이미 숨겨져 있다면 다시 보이게 함
        : [...prevHiddenType, type] // 타입을 숨김 상태로 만듦
    )
  }

  return (
    <NavermapsProvider ncpClientId={NAVER_MAPS_API_KEY}>
      <div>
        <Map markers={markers} hiddenType={hiddenType} center={myLocation} />
        <FilterButton toggleType={toggleType} />
      </div>
    </NavermapsProvider>
  );
}

export default App;