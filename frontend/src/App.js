import React, { useState, useEffect } from 'react';
import { SocketContext, socket } from './socket';

import CompanyData from './components/CompanyData/CompanyData';
import ErrorAlert from './components/UI/ErrorAlert';

const App = () => {
  const [loadedCompanyData, setLoadedCompanyData] = useState([]);
  const [listOfUnitsNames, setListOfUnitsNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchCompanyData() {
      setIsLoading(true);

      // TODO: use from web storage after login
      const companyId = '';
      if (!companyId || companyId.trim().length === 0) {
        console.log('Must MOCK HARDCODED company ID');
        setError('Must MOCK HARDCODED company ID');
      }

      try {
        const response = await fetch('http://localhost:3000/company-data', {
          method: 'POST',
          body: JSON.stringify({
            companyId: companyId,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Fetching company data failed.');
        }

        setListOfUnitsNames(
          resData.company_data.map((e) => `${e.unit_city} ${e.unit_number}`)
        );

        setLoadedCompanyData(resData.company_data);
      } catch (err) {
        setError(
          err.message ||
            'Fetching company data failed - the server responded with an error.'
        );
      }

      setIsLoading(false);
    }

    fetchCompanyData();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {error && <ErrorAlert errorText={error} />}
      {!isLoading && (
        <CompanyData
          listOfUnitsNames={listOfUnitsNames}
          companyData={loadedCompanyData}
        />
      )}
    </SocketContext.Provider>
  );
};

export default App;
