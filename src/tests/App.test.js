import React from 'react';
import { render, screen, waitForElementToBeRemoved, waitFor, fireEvent } from '@testing-library/react';

import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

test('I am your test', async () => {
  jest.spyOn(global, 'fetch');

  global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(testData), })
    render(
      <App />
  );
  await waitFor(() => { 
    // Testa chamada da API
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');

    //Testa se o planeta 'Tatooine" aparece na tela após a api ser carregada
    expect(screen.getByText(/tatooine/i)).toBeInTheDocument();
  });
  
  // Testa se inputs são reinderizados
  expect(screen.getByTestId('name-filter')).toBeInTheDocument();
  expect(screen.getByTestId('column-filter')).toBeInTheDocument();
  expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
  expect(screen.getByTestId('value-filter')).toBeInTheDocument();
  expect(screen.getByTestId('button-filter')).toBeInTheDocument();
  expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();
  expect(screen.getByTestId('column-sort')).toBeInTheDocument();

  // Testa inputs e botão de remover um filtro - maior que
  act(() => {
    fireEvent.change(screen.getByTestId('column-filter'), {
      target: {value: 'orbital_period'}
    });
    fireEvent.change(screen.getByTestId('comparison-filter'),{
      target: {value: 'maior que'}
    });
    fireEvent.change(screen.getByTestId('value-filter'), {
      target: {value: '400'}
    });
  })
  expect(screen.getByRole('option', { name: 'maior que'}).selected).toBe(true)

  act(() => { fireEvent.click(screen.getByTestId('button-filter')) })
  expect(screen.getByText('Bespin')).toBeInTheDocument();
  const filter = screen.getAllByTestId('filter')
  expect(filter.length).toBe(1)
  expect(screen.getByRole('button', { name: 'Deletar'})).toBeInTheDocument();

  act(() => { fireEvent.click(screen.getByText('Deletar')) })
  expect(screen.getByText(/tatooine/i)).toBeInTheDocument();

// ///////////////////////////////////////////////////////////////////////////////////

  // Testa inputs e botão de remover um filtro - menor que
  act(() => {
    fireEvent.change(screen.getByTestId('column-filter'), {
      target: {value: 'surface_water'}
    });
    fireEvent.change(screen.getByTestId('comparison-filter'),{
      target: {value: 'menor que'}
    });
    fireEvent.change(screen.getByTestId('value-filter'), {
      target: {value: '10'}
    });
  })
  expect(screen.getByRole('option', { name: 'menor que'}).selected).toBe(true)
  act(() => {
    fireEvent.click(screen.getByTestId('button-filter'));
  })
  expect(screen.getByText('Tatooine')).toBeInTheDocument();
  act(() => {
    fireEvent.click(screen.getByTestId('button-remove-filters'));
  })  

  // // Testa inputs e botão de remover todos os filtros - igual a
  act(() => {
    fireEvent.change(screen.getByTestId('column-filter'), {
      target: {value: 'diameter'}
    });
    fireEvent.change(screen.getByTestId('comparison-filter'),{
      target: {value: 'igual a'}
    });
    fireEvent.change(screen.getByTestId('value-filter'), {
      target: {value: '12500'}
    });
  })
  expect(screen.getByRole('option', { name: 'igual a'}).selected).toBe(true);
  act(() => {
    fireEvent.click(screen.getByTestId('button-filter'));
  })
  expect(screen.getByRole('cell', { name: /alderaan/i })).toBeInTheDocument();
  act(() => {
    fireEvent.click(screen.getByTestId('button-remove-filters'));
  })
  expect(screen.getByText('Tatooine')).toBeInTheDocument();
  
  // //Testa se o loading desaparece quando a api é carregada
  // await waitForElementToBeRemoved(() => screen.getByTestId('loading'), { timeout: 3000 })
  
  // // //Testa se o header da tabela aparece na tela após a api ser carregada
  expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: /rotation_period/i })).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: /orbital_period/i })).toBeInTheDocument();

  // //Testa o filtro de 'name' se funciona
  act(() => {
    userEvent.type(screen.getByTestId('name-filter'), 'd');
  })
  expect(screen.getByRole('cell', { name: /alderaan/i })).toBeInTheDocument();

  // screen.logTestingPlaygroundURL();
});
