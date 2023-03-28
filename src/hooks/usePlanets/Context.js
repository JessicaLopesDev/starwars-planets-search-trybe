import { createContext, useContext } from 'react';

export const PlanetsContext = createContext();

export const usePlanets = () => useContext(PlanetsContext);
