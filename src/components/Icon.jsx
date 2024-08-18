import React from 'react';

  const Icon = ({ icon, color, backgroundColor, size = 40 }) => {
    const circleRadius = 365;
    const scale = 0.8;  
    const fillOpacity = 0.8;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${circleRadius * 2} ${circleRadius * 2}`} width={size} height={size}>
        <circle cx={circleRadius} cy={circleRadius} r={circleRadius} fill={backgroundColor} fillOpacity={fillOpacity} />
        <path fill={color} d={icon.icon[4]} transform={`translate(${circleRadius / 3}, ${circleRadius / 3}) scale(${scale})`} />
    </svg>
  );
};

export default Icon;