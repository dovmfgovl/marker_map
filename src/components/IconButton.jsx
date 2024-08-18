import React from 'react';
import Icon from './Icon';

const IconButton = ({ icon, label, onClick, iconColor, backgroundColor }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      <Icon 
        icon={icon}
        color={iconColor}
        backgroundColor={backgroundColor}
      />
      <span style={{ fontSize: '14px' }}>{label}</span>  
    </button>
  )
}

export default IconButton;