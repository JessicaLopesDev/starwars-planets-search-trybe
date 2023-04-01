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
    handleRemoveFilter,
    handleRemoveAllFilters,
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
            columnOptions.map((option, index) => (
              <option
                key={ `${option}-${index}` }
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
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => handleRemoveAllFilters() }
      >
        REMOVER FILTROS
      </button>
      {
        selectedFilter && selectedFilter.map((filter, index) => (
          <div
            data-testid="filter"
            key={ `${filter}-${index}` }
          >
            <span>{ filter }</span>
            <button
              type="button"
              onClick={ () => handleRemoveFilter(filter) }
            >
              Deletar
            </button>
          </div>
        ))
      }
    </form>
  );
}
// { `${filter.selectedColumn}
// ${filter.selectedComparison}
// ${filter.selectedValue}` }
