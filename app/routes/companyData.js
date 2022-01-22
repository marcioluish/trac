const express = require('express');
const router = express.Router();

const Unit = require('../models/unit');
const Asset = require('../models/asset');

router.get('/company-data', async (req, res, next) => {
  console.log('TRYING TO FETCH COMPANY DATA');
  const companyId = req.body.companyId;
  let rawCompanyData = [];
  let assetData = [];

  try {
    const units = await Unit.find({ companyId: companyId });

    for (unit of units) {
      const assets = await Asset.find({ unitId: unit.id });
      if (assets.length === 0) {
        console.log(`No asset registered for the unit ${unit.id}`);
        return res
          .status(400)
          .json({ message: `No asset registered for the unit ${unit.id}` });
      }
      for (asset of assets) {
        assetData.push({
          assetId: asset.id,
          assetName: asset.name,
          assetDescription: asset.description,
          assetModel: asset.model,
          assetOwner: asset.owner,
        });
      }
      console.log(JSON.stringify(assetData));
      rawCompanyData.push({
        unit_id: unit.id,
        unit_city: unit.unit_city,
        unit_number: unit.unit_number,
        assets: JSON.stringify(assetData),
      });
      assetData = [];
    }

    res.status(200).json({
      message: 'Company data fetched!',
      company_data: rawCompanyData,
    });
    console.log('FETCHED COMPANY DATA');
  } catch (err) {
    console.error('ERROR FETCHING COMPANY DATA');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to fetch company data.', error: err.message });
  }
});

module.exports = router;
