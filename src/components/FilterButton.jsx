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
      {Object.keys(icons).map(type => (
        <IconButton 
          key={type}
          type={type}
          toggleType={toggleType}
          iconData={icons[type]}
        />
      ))}
    </div>
  )
}

export default FilterButton;