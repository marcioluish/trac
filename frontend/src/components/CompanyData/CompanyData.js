import React, { useState } from 'react';

import Card from '../UI/Card';
import CompanyUnitFilter from './CompanyUnitFilter';
import AssetsList from './AssetsList';
import './CompanyData.css';

const CompanyData = (props) => {
  const [unit, setUnit] = useState(null);

  const filterByUnit = (index) => {
    setUnit(props.companyData[index]);
  };

  console.log('COMPANY DATA');

  let filteredAssets;
  if (unit) {
    filteredAssets = JSON.parse(unit.assets).map((e) => {
      e.status = '';
      e.health_level = '';
      return e;
    });
  }

  return (
    <div>
      <Card className="assets">
        <CompanyUnitFilter
          unit={unit}
          listOfUnitsNames={props.listOfUnitsNames}
          onUnitSelected={filterByUnit}
        />
        <AssetsList assets={filteredAssets} />
      </Card>
    </div>
  );
};

export default CompanyData;
