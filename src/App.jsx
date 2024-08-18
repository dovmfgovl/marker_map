//import logo from './logo.svg';
//import './App.css';
import { NavermapsProvider } from "react-naver-maps";
import axios from 'axios';
import Map from './components/Map';
import FilterButton from './components/FilterButton';
import { useEffect, useState } from "react";

const NAVER_MAPS_API_KEY= process.env.REACT_APP_NAVER_MAPS_API_KEY;

function App() {
  const [markers, setMarkers] = useState([]);
  const [hiddenType, sethiddenType] = useState([]); // 숨겨진 타입들 저장
  const [myLocation, setMyLocation] = useState({latitude: 37.5358994, longitude: 126.8969627});

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await axios.get("https://apiy.yourpick.co.kr/mission/test001");
        setMarkers(response.data);
      } catch (error) {
        console.error("marker 가져오기 실패", error);
      }
    };

    fetchMarkers();
  }, []);

  const toggleType = (type) => {
    sethiddenType(prevHiddenType =>
      prevHiddenType.includes(type) ? prevHiddenType.filter(t => t !== type)/* 이미 숨겨져 있다면 다시 표시 */ : [...prevHiddenType, type] /* 숨겨진 타입에 추가 */
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