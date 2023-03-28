import PropTypes from 'prop-types';
import PlanetsProvider from './usePlanets/Provider';

export default function Contexts({ children }) {
  return (
    <PlanetsProvider>
      { children }
    </PlanetsProvider>
  );
}

Contexts.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
