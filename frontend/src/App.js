import React, { useState } from 'react';
import bins from './services/bins';
import BinCreator from './components/BinCreator';

const App = () => {
  const [ binId, setBinId ] = useState(undefined);

  const createBinHandler = async event => {
    event.preventDefault();
    const newId = await bins.requestNewBin();
    setBinId(newId);
  };

  return (
    <div>
      <BinCreator createBinHandler={createBinHandler} />
      <p>{binId !== undefined ? binId : ''}</p>
    </div>
  );
};

export default App;
