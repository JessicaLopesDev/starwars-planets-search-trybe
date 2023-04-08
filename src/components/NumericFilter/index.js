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
    handleRemoveFilter,
    handleRemoveAllFilters,
    options,
    sortSelected,
    setSortSelected,
    filters,
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
        filters && filters.map((filter, index) => (
          <div
            data-testid="filter"
            key={ `${filter}-${index}` }
          >
            <span>
              {
                `${filter.column}
                ${filter.comparison}
                ${filter.value}`
              }
            </span>
            <button
              type="button"
              onClick={ () => handleRemoveFilter(index, filter.column) }
            >
              Deletar
            </button>
          </div>
        ))
      }
      <label htmlFor="column-sort">
        Ordenar
        <select
          name="sortColumn"
          data-testid="column-sort"
          id="column-sort"
          value={ sortSelected }
          onChange={ ({ target }) => setSortSelected(target.value) }
        >
          {
            options.map((option, index) => (
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
      <input
        data-testid="column-sort-input-asc"
        type="radio"
        name="sort"
        value="ASC"
        label="Crescente"
        // onClick={ (e) => setSortInput(e.target.value) }
      />
      <input
        data-testid="column-sort-input-desc"
        type="radio"
        name="sort"
        value="DESC"
        label="Decrescente"
        // onClick={ (e) => setSortInput(e.target.value) }
      />
      <button
        type="button"
        data-testid="column-sort-button"
        // onClick={ () => handleRemoveAllFilters() }
      >
        ORDENAR
      </button>
    </form>
  );
}
