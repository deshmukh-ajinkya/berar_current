// data-provider.jsx
import React, { useReducer, useMemo } from 'react';
import { dataReducer, globalData } from './initialState';
import { DataContext } from './data-context'; // Assuming you defined this separately

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, globalData);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
}
