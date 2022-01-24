import React from 'react';

import './CompanyUnitFilter.css';

const CompanyUnitFilter = (props) => {
  const unitChangeHandler = (event) => {
    props.onUnitSelected(event.target.value);
  };

  return (
    <div className="unit-filter">
      <div className="unit-filter__control">
        <label>Filter by unit</label>
        <select onChange={unitChangeHandler}>
        <option hidden label='Select a unit'></option>
          {props.listOfUnitsNames.map((e, index) => (
            <option key={index} value={index}>
              {e}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CompanyUnitFilter;
