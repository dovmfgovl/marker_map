import React from 'react';

const Icon = ({ icon, color, backgroundColor }) => {
  // 아이콘과 원 크기 조정
  const iconSize = 40; // 전체 아이콘 크기 설정
  const circleRadius = 365; // 원 반지름 설정
  const viewBoxSize = 2 * circleRadius; // 뷰박스를 원 크기에 맞게 설정
  const scale = 0.8; // fontawesome 아이콘 크기 조정

  const iconSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" width="${iconSize}" height="${iconSize}">
          <circle cx="${circleRadius}" cy="${circleRadius}" r="${circleRadius}" fill="${backgroundColor}" fill-opacity="0.8" />
          <path fill="${color}" d="${icon.icon[4]}" transform="translate(${circleRadius / 3}, ${circleRadius / 3}) scale(${scale})" />
        </svg>
  `;

  return <div dangerouslySetInnerHTML={{ __html: iconSVG }} />;
};

export default Icon;