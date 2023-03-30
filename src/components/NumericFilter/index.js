import { usePlanets } from '../../hooks/usePlanets/Context';

export default function NumericFilter() {
  const {
    selectedColumn,
    setSelectedColumn,
    selectedComparison,
    setSelectedComparison,
    selectedValue,
    setSelectedValue,
    handleSubmit,
    columnOptions,
    selectedFilter,
  } = usePlanets();

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="column-filter">
        Coluna
        <select
          name="column"
          data-testid="column-filter"
          id="column-filter"
          value={ selectedColumn }
          onChange={ ({ target }) => setSelectedColumn(target.value) }
        >
          {
            columnOptions.map((option) => (
              <option
                key={ option }
                value={ option }
              >
                {option}
              </option>
            ))
          }
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Operador
        <select
          name="comparison"
          data-testid="comparison-filter"
          id="comparison-filter"
          value={ selectedComparison }
          onChange={ ({ target }) => setSelectedComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>

        </select>
      </label>

      <label htmlFor="value-filter">
        <input
          data-testid="value-filter"
          type="number"
          value={ selectedValue }
          onChange={ ({ target }) => setSelectedValue(target.value) }
        />
      </label>
      <button
        type="submit"
        data-testid="button-filter"
      >
        FILTRAR
      </button>
      {
        selectedFilter && selectedFilter.map((item) => (
          <span key={ item }>{ item }</span>
        ))
      }
    </form>
  );
}
