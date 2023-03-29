import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { usePlanets } from '../../hooks/usePlanets/Context';

export default function Home() {
  const { data, fetchPlanets } = usePlanets();
  const [name, setName] = useState('');

  const filteredData = data.filter((planet) => planet
    .name.toLowerCase().includes(name.toLowerCase()));

  useEffect(() => {
    fetchPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {
        // eslint-disable-next-line no-nested-ternary
        !data.length
          ? <span>Loading...</span>
          : !filteredData.length
            ? (
              <Table data={ data } />
            ) : (
              <Table data={ filteredData } />
            )
      }
    </div>
  );
}
