/* 
Date: 2024.08.18
Description: 아이콘 버튼 컴포넌트 구현
Function
  - 아이콘과 레이블을 수직으로 배치한 버튼 렌더링
  - 버튼 클릭 시 toggleType 함수 호출하여 특정 유형 필터를 토글
  - 버튼 스타일 디자인
Author: 이슬기
*/

import React from 'react';
import Icon from './Icon';

const IconButton = ({ /* icon, label, onClick, iconColor, backgroundColor */ type, toggleType, iconData }) => {
  return (
    <button
      onClick={() => toggleType(type)}
      style={{
        display: 'flex',
        flexDirection: 'column', // 내부 요소 수직 방향 배치
        alignItems: 'center', // 내부 요소 수평 중앙 정렬
        background: 'none',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      <Icon {...iconData} /> {/* 아이콘 렌더링 */}
      <span style={{ fontSize: '14px' }}>{iconData.label}</span>  
    </button>
  )
}

export default IconButton;