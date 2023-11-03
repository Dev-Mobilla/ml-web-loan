import React from 'react'

const CustomSelect = ({ selectName, availableOptions, selectedOption, OnSelectChange, styles, defaultVal }) => {
  const Select = () => {
    return (
        availableOptions != null ? 
            <select name={selectName} value={selectedOption} onChange={OnSelectChange} className={styles}>
                <option value="">{defaultVal}</option>
                {
                   availableOptions?.map((option, key) => {
                    <option value={option.value} key={key}>
                        {option.value}
                    </option>
                })
                }
            </select>
        : 
        <input type="text" value={selectedOption} readOnly className={styles}/>
        // <select name={selectName} value={selectedOption} onChange={OnSelectChange} className={styles} aria-readonly>
        //     <option value={selectedOption}></option>
        // </select>
    )
  }
  
    return (
        <Select/>
    )
}

export default CustomSelect;