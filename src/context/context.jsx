import { createContext, useState } from "react";

// Create context
export const DataContext = createContext();

// Provider component
export function DataProvider({ children }) {
  const [dataList, setDataList] = useState([]);

  return (
    <DataContext.Provider value={{ dataList, setDataList }}>
      {children}
    </DataContext.Provider>
  );
}
