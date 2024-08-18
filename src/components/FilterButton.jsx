import React from 'react';
import IconButton from './IconButton';
import { faCoffee, faHamburger, faPills, faStore } from '@fortawesome/free-solid-svg-icons';

const icons = {
  CAFE: { icon: faCoffee, color: '#FFFFFF', backgroundColor: '#A37B7B' },
  FOOD: { icon: faHamburger, color: '#FFFFFF', backgroundColor: '#F29979' },
  MART: { icon: faStore, color: '#FFFFFF', backgroundColor: '#F279BC' },
  PHARMACY: { icon: faPills, color: '#FFFFFF', backgroundColor: '#87C0CB' },
};

const FilterButton = ({ toggleType }) => {
  return (
    <div style={{marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px"}}>
      {Object.keys(icons).map(type => (
        <IconButton 
          key={type}
          icon={icons[type].icon}
          label={type === 'CAFE' ? '카페' : type === 'FOOD' ? '음식점' : type === 'MART' ? '편의점' : '약국'}
          onClick={() => toggleType(type)}
          iconColor={icons[type].color}
          backgroundColor={icons[type].backgroundColor}
        />
      ))}
      {/* <button onClick={() => toggleType("CAFE")}>카페</button>
      <button onClick={() => toggleType("FOOD")}>음식점</button>
      <button onClick={() => toggleType("MART")}>편의점</button>
      <button onClick={() => toggleType("PHARMACY")}>약국</button> */}
    </div>
  )
}

export default FilterButton;