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

  // const selectedsOptions = {
  //   column: 'population',
  //   comparison: 'maior que',
  //   value: 0,
  // };

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [columnOptions, setColumnOptions] = useState(options);
  const [selectedFilter, setSelectedFilter] = useState([]);
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
    setSelectedFilter((prevState) => [
      ...prevState, `${selectedColumn} ${selectedComparison} ${selectedValue}`]);

    const newOption = columnOptions.filter((item) => item !== selectedColumn);
    setSelectedColumn(newOption[0]);
    setColumnOptions(newOption);
    // console.log(result);
  };

  const handleRemoveFilter = (column) => {
    const newSelectedFilter = selectedFilter
      .filter((item) => item.selectedColumn !== column);
    setSelectedFilter(newSelectedFilter);
    setColumnOptions((prevState) => [...prevState, column]);
    // const newFilteredData = filteredData
    //   .filter();
    console.log(columnOptions);
  };

  const handleRemoveAllFilters = () => {
    setSelectedFilter([]);
    setFilteredData(data);
    setColumnOptions(options);
    setSelectedColumn('population');
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
        columnOptions,
        setColumnOptions,
        selectedFilter,
        setSelectedFilter,
        handleRemoveFilter,
        handleRemoveAllFilters,
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
