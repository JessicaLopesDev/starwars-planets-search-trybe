import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { PlanetsContext } from './Context';
import * as api from '../../services/planets';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  const fetchPlanets = useCallback(() => {
    api.getPlanets().then((response) => {
      response.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setData(response.results);
    });
  }, []);

  return (
    <PlanetsContext.Provider
      value={ {
        data,
        fetchPlanets,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetsProvider;
