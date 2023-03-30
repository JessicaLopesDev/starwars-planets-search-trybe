import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import App from '../App';

test('I am your test', async () => {
  render(<App />);

  const nameInput = screen.getByTestId('name-filter')
  expect(nameInput).toBeInTheDocument();

  //Testa o select Coluna, clicando em 'população'
  const columnSelect = screen.getByRole('combobox', { name: /coluna/i })
  const populationSelected = screen.getByRole('option', { name: 'population'})
  expect(columnSelect).toBeInTheDocument();
  userEvent.selectOptions(columnSelect, 'population');
  expect(populationSelected.selected).toBe(true)

    //Testa o select Operador, clicando em 'menor que'
  const comparisonSelect = screen.getByRole('combobox', { name: /operador/i })
  const biggerSelected = screen.getByRole('option', { name: 'menor que'})
  expect(comparisonSelect).toBeInTheDocument();
  userEvent.selectOptions(comparisonSelect, 'menor que');
  expect(biggerSelected.selected).toBe(true)
  
    //Testa se o loading desaparece quando a api é carregada
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'), { timeout: 3000 })
  
  // //Testa se o header da tabela 'name' aparece na tela após a api ser carregada
  const nameHeadingTable = screen.getByRole('columnheader', { name: /name/i })
  expect(nameHeadingTable).toBeInTheDocument();

  //   //Testa se o planeta 'Tatooine" aparece na tela após a api ser carregada
  const firstPlanet = screen.getByRole('cell', { name: /tatooine/i })
  expect(firstPlanet).toBeInTheDocument();

  // //Testa o filtro de 'name' se funciona
  userEvent.type(nameInput, 'd');
  expect(firstPlanet).not.toBeInTheDocument();
  
  const filterButton = screen.getByRole('button', { name: /filtrar/i })
  expect(filterButton).toBeInTheDocument();

  // // userEvent.click(filterButton);
  // screen.logTestingPlaygroundURL();
});
