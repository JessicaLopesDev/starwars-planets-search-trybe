import { useEffect } from 'react';
import Table from '../../components/Table';
import { usePlanets } from '../../hooks/usePlanets/Context';

export default function Home() {
  const { data, fetchPlanets } = usePlanets();
  // console.log(data);

  useEffect(() => {
    fetchPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        !data.length
          ? <span>Loading...</span>
          : <Table data={ data } />
      }
    </div>
  );
}
