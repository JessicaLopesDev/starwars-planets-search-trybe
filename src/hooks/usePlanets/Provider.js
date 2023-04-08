import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { PlanetsContext } from './Context';
import * as api from '../../services/planets';

function PlanetsProvider({ children }) {
  const options = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [columnOptions, setColumnOptions] = useState(options);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [selectedValue, setSelectedValue] = useState(0);
  const [sortSelected, setSortSelected] = useState('population');
  const [filters, setFilters] = useState([]);

  const fetchPlanets = useCallback(() => {
    api.getPlanets().then((response) => {
      response.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setData(response.results);
    });
  }, []);

  const getBiggerData = (result, planets, filter) => {
    if (!result.length) {
      return planets
        .filter((planet) => Number(planet[filter.column]) > Number(filter.value));
    }
    return result
      .filter((planet) => Number(planet[filter.column]) > Number(filter.value));
  };

  const getSmallerData = (result, planets, filter) => {
    if (!result.length) {
      return planets
        .filter((planet) => Number(planet[filter.column]) < Number(filter.value));
    }
    return result
      .filter((planet) => Number(planet[filter.column]) < Number(filter.value));
  };

  const getEqualData = (result, planets, filter) => {
    if (!result.length) {
      return planets
        .filter((planet) => Number(planet[filter.column]) === Number(filter.value));
    }
    return result
      .filter((planet) => Number(planet[filter.column]) === Number(filter.value));
  };

  const handleFilter = (newFilters, type) => {
    const filtersData = type === 'remove' ? data : filteredData;

    let result = [];

    newFilters.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        result = getBiggerData(result, filtersData, filter);
      }
      if (filter.comparison === 'menor que') {
        result = getSmallerData(result, filtersData, filter);
      }
      if (filter.comparison === 'igual a') {
        result = getEqualData(result, filtersData, filter);
      }
    });

    setFilteredData(result);

    const newOption = columnOptions.filter((item) => item !== selectedColumn);
    setSelectedColumn(newOption[0]);
    setColumnOptions(newOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFilters((prevState) => {
      handleFilter([...prevState, {
        column: selectedColumn,
        comparison: selectedComparison,
        value: selectedValue,
      }]);

      return (
        [...prevState, {
          column: selectedColumn,
          comparison: selectedComparison,
          value: selectedValue,
        }]
      );
    });
  };

  const handleRemoveFilter = (index, column) => {
    const selectedFilter = filters
      .filter((_, i) => index !== i);

    if (selectedFilter.length) {
      handleFilter(selectedFilter, 'remove');
      setFilters(selectedFilter);
    } else {
      setFilteredData(data);
      setFilters(selectedFilter);
    }

    setColumnOptions((prevState) => [...prevState, column]);
  };

  const handleRemoveAllFilters = () => {
    setFilters([]);
    setFilteredData(data);
    setColumnOptions(options);
    setSelectedColumn('population');
  };

  useEffect(() => {
    if (!name.length) {
      setFilteredData(data);
    }

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
        columnOptions,
        setColumnOptions,
        handleRemoveFilter,
        handleRemoveAllFilters,
        options,
        sortSelected,
        setSortSelected,
        filters,
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
