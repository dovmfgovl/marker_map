/* 
Date: 2024.08.18
Description: 마커 필터링 버튼 컴포넌트 구현
Function
  - 마커 유형에 따라 필터링할 수 있는 버튼 렌더링
  - 사용자가 버튼을 클릭하여 지도에 표시될 마커 유형을 선택/해제
  - 각 버튼은 특정 마커 유형을 나타내며 클릭 시 toggleType 함수가 호출되어 마커 표시 여부 변경
Author: 이슬기
*/

import React from 'react';
import IconButton from './IconButton';
import { faCoffee, faHamburger, faPills, faStore } from '@fortawesome/free-solid-svg-icons';

const icons = {
  CAFE: { icon: faCoffee, color: '#FFFFFF', backgroundColor: '#A37B7B', label: '카페' },
  FOOD: { icon: faHamburger, color: '#FFFFFF', backgroundColor: '#F29979', label: '음식점' },
  MART: { icon: faStore, color: '#FFFFFF', backgroundColor: '#F279BC', label: '편의점' },
  PHARMACY: { icon: faPills, color: '#FFFFFF', backgroundColor: '#87C0CB', label: '약국' },
};

const FilterButton = ({ toggleType }) => {
  return (
    <div style={{marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px"}}>
      {/* icons 객체의 각 키로 IconButton 컴포넌트 렌더링 */}
      {Object.keys(icons).map(type => (
        <IconButton 
          key={type}
          type={type} // 버튼 유형 전달
          toggleType={toggleType} // 클릭 시 호출될 함수 전달
          iconData={icons[type]} // 버튼에 표시할 아이콘, 스타일 데이터 전달
        />
      ))}
    </div>
  )
}

export default FilterButton;