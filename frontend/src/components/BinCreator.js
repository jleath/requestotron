import React from 'react';

const BinCreator = ({ createBinHandler }) => {
  return (
    <div>
      <form onSubmit={createBinHandler}>
        <button type="submit">Create Bin</button>
      </form>
    </div>
  );
};

export default BinCreator;