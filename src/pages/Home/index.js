import { useEffect } from 'react';
import Filter from '../../components/NumericFilter';
import Table from '../../components/Table';
import { usePlanets } from '../../hooks/usePlanets/Context';

export default function Home() {
  const {
    name,
    setName,
    filteredData,
    fetchPlanets,
  } = usePlanets();

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <div>
      <label htmlFor="name-filter">
        Star Wars
        <input
          data-testid="name-filter"
          id="name-filter"
          type="text"
          value={ name }
          name="name"
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>
      <Filter />
      {
        !filteredData.length ? (
          <span data-testid="loading">Loading...</span>
        ) : (
          <Table data={ filteredData } />
        )
      }
    </div>
  );
}
