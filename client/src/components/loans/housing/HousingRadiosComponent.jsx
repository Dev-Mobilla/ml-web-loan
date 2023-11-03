import React, {useEffect} from 'react';


const HousingRadiosComponent = ({ radioVal, onSelected, radioName }) => {

  return (
    <div>
      {
        radioVal?.map((element, key) => {
          return (
            <div key={key} className='housing-radios'>
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