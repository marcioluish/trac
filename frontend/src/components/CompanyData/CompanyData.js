import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../socket';

import Card from '../UI/Card';
import CompanyUnitFilter from './CompanyUnitFilter';
import AssetsList from './AssetsList';
import './CompanyData.css';

const CompanyData = (props) => {
  const [unit, setUnit] = useState('');
  const [filteredAssets, setFilteredAssets] = useState('');
  const socket = useContext(SocketContext);

  const filterByUnit = (index) => {
    setUnit(props.companyData[index]);
    setFilteredAssets(
      JSON.parse(props.companyData[index].assets).map((e) => {
        e.status = '';
        e.health_level = '';
        return e;
      })
    );
  };

  useEffect(() => {
    // MOCK Activating kafka consumer
    fetch('http://localhost:3000/kafka', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    socket.on('assets-data', function (data) {
      // setSocketData(data.assetData);
    });
  }, []);

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
