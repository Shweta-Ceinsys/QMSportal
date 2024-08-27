import React, { createContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [dataId, setData] = useState({ id: null, version: null });
  const [dirId, setDirId] = useState(null);

  return (
    <DataContext.Provider value={{ dataId, setData ,dirId, setDirId}}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };