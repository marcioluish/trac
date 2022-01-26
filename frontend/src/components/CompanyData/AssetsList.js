import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../socket';

import Card from '../UI/Card';
import './AssetsList.css';

const AssetsList = (props) => {
  const [assets, setAssets] = useState(null);
  const socket = useContext(SocketContext);

  console.log('ASSETS LIST');
  // Setup just on parent rendering
  useEffect(() => {
    console.log('KAFKA CONSUMERS');
    // Open kafka consumers on first component rendering
    fetch('http://localhost:3000/kafka', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, []);

  useEffect(() => {
    // Set const assets
    if (props.assets) {
      setAssets(props.assets);

      // Open socket on valid assets data from props
      socket.on('assets-data', (data) => {
        setAssets((prev) =>
          prev.map((e) => {
            if (e.assetId === data.assetData.assetId) {
              if (data.assetData.key === 'health_level') {
                e.health_level = data.assetData.value;
              } else {
                e.status = data.assetData.value;
              }
            }
            return e;
          })
        );
      });
    }
    return () => {
      socket.removeAllListeners('assets-data');
    };
  }, [props.assets]);

  return !assets ? (
    <p className="assets-list__fallback">
      Please select a unit from the above drop-down menu
    </p>
  ) : (
    <ul className="assets-list">
      {assets.map((e) => (
        <li key={e.assetId}>
          <Card className="asset-item">
            <div className="asset-item__description">
              <h2>{e.assetName}</h2>
              <div className="asset-description">{e.assetDescription}</div>
              <div className="asset-owner-model">Owner: {e.assetOwner}</div>
              <div className="asset-owner-model">Model: {e.assetModel}</div>
            </div>
            <div>
              <div className="asset-sh-el">Status: {e.status}</div>
              <div className="asset-sh-el">Health Level: {e.health_level}</div>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default AssetsList;
