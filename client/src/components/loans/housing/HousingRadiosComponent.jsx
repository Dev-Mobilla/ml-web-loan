import React, {useEffect, useState} from 'react';


const HousingRadiosComponent = ({ radioVal, onSelected, radioName , styles, parentStyles, defaultVal}) => {

  return (
    <div className={parentStyles}>
      {
        radioVal?.map((element, key) => {
          return (
            <div key={key} className={`housing-radios ${styles}`}>
              <input 
              type="radio" 
              name={radioName} 
              value={element.name} 
              onChange={onSelected}
              checked={defaultVal === element.name}
              />
              <span>{element.name}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default HousingRadiosComponent;