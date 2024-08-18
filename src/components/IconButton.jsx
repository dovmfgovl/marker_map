import React from 'react';
import Icon from './Icon';

const IconButton = ({ /* icon, label, onClick, iconColor, backgroundColor */ type, toggleType, iconData }) => {
  return (
    <button
      onClick={() => toggleType(type)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      <Icon {...iconData} />
      <span style={{ fontSize: '14px' }}>{iconData.label}</span>  
    </button>
  )
}

export default IconButton;