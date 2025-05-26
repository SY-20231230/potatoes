// MapContext.js
import {createContext, useContext} from 'react';

export const MapContext = createContext(false);
export const useIsMapPage = () => useContext(MapContext);
