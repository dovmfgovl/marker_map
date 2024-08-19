/* 
Date: 2024.08.18
Description: SVG 아이콘 컴포넌트 구현
Function
  - 아이콘과 배경 원을 포함한 SVG 요소 렌더링
  - 아이콘 코기, 색상, 배경색을 props로 받아 설정
  - 원의 반지름과 이이콘 크기, 투명도 설정
Author: 이슬기
*/

import React from 'react';

  const Icon = ({ icon, color, backgroundColor, size = 40 }) => {
    const circleRadius = 365; // SVG 원 반지름
    const scale = 0.8; // 아이콘 크기 조정 비율
    const fillOpacity = 0.8; // 원 투명도

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${circleRadius * 2} ${circleRadius * 2}`} width={size} height={size}>
        <circle cx={circleRadius} cy={circleRadius} r={circleRadius} fill={backgroundColor} fillOpacity={fillOpacity} />
        <path fill={color} d={icon.icon[4]} transform={`translate(${circleRadius / 2.5}, ${circleRadius / 2.5}) scale(${scale})`} />
    </svg>
  );
};

export default Icon;