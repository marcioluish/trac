import React from 'react';

import Card from '../UI/Card';
import './AssetsList.css';

const AssetsList = (props) => {
  if (props.assets === '') {
    return (
      <p className="assets-list__fallback">
        Please select a unit from the above drop-down menu
      </p>
    );
  }

  return (
    <ul className="assets-list">
      {props.assets.map((e) => (
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
