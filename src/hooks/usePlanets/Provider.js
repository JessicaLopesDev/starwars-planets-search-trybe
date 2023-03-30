import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { PlanetsContext } from './Context';
import * as api from '../../services/planets';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState(0);

  const fetchPlanets = useCallback(() => {
    api.getPlanets().then((response) => {
      response.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setData(response.results);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    let result = [];

    if (selectedComparison === 'maior que') {
      result = filteredData
        .filter((planet) => Number(planet[selectedColumn]) > Number(selectedValue));
    }

    if (selectedComparison === 'menor que') {
      result = filteredData
        .filter((planet) => Number(planet[selectedColumn]) < Number(selectedValue));
    }

    if (selectedComparison === 'igual a') {
      result = filteredData
        .filter((planet) => Number(planet[selectedColumn]) === Number(selectedValue));
    }

    setFilteredData(result);
  };

  useEffect(() => {
    if (!name.length) setFilteredData(data);

    const newData = data.filter((planet) => planet
      .name.toLowerCase().includes(name.toLowerCase()));

    setFilteredData(newData);
  }, [data, name]);

  return (
    <PlanetsContext.Provider
      value={ {
        fetchPlanets,
        name,
        setName,
        selectedColumn,
        setSelectedColumn,
        selectedComparison,
        setSelectedComparison,
        selectedValue,
        setSelectedValue,
        handleSubmit,
        filteredData,
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
