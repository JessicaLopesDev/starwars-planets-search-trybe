export const getPlanets = () => {
  const data = fetch('https://swapi.dev/api/planets')
    .then((response) => response.json());

  return data;
};
