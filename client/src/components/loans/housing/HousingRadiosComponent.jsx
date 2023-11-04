import React, {useEffect} from 'react';


const HousingRadiosComponent = ({ radioVal, onSelected, radioName , styles}) => {

  return (
    <div>
      {
        radioVal?.map((element, key) => {
          return (
            <div key={key} className={`housing-radios ${styles}`}>
              <input type="radio" name={radioName} value={element.name} onChange={onSelected}/>
              <span>{element.name}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default HousingRadiosComponent;