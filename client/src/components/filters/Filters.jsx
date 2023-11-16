/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
//! Aquí generamos ESTADOS LOCALES PARA ACTUALIZAR DIRECTAMENTE LA INFORMACIÓN

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountries,
  filterByContinent,
  reloadFilters,
  filterByActivity,
  sortByOrderAbc,
  sortByPopulation,
} from "../../redux/actions/actions";

import styles from "./Filters.module.css";

const Filters = ({ page }) => {
  const dispatch = useDispatch();
  const activitiesData = useSelector((state) => state.activitiesBackUp);

  const [filters, setFilters] = useState({
    continents: "",
    population: "",
    name: "",
    activities: "",
  });
  const [initialFilters, setInitialFilters] = useState({
    continents: "",
    population: "",
    name: "",
    activities: "",
  });

  //!HANDLERS PARA MANEJAR LAS OPCIONES ELEJIDAS EN FILTROS

  function handleReload() {
    page(1);
    setFilters(initialFilters);
    dispatch(reloadFilters());
    dispatch(getAllCountries());
  }

  const handleSortByOrderAbc = (event) => {
    page(1);
    setFilters({ ...filters, name: event.target.value });
    dispatch(sortByOrderAbc(event.target.value));
  };

  const handleSortByOrderPopulation = (event) => {
    page(1);
    setFilters({ ...filters, population: event.target.value });
    dispatch(sortByPopulation(event.target.value));
  };

  const handleFilterByContinent = (event) => {
    page(1);
    setFilters({ ...filters, continents: event.target.value });
    dispatch(filterByContinent(event.target.value));
  };

  const handleFilterByActivity = (event) => {
    page(1);
    setFilters({ ...filters, activities: event.target.value });
    dispatch(filterByActivity(event.target.value));
  };

  return (
    <>
      <div>
        <select
          value={filters.name}
          onChange={(event) => {
            handleSortByOrderAbc(event);
          }}>
          <option value="0" disabled>
            Order alphabetically
          </option>
          <option value="asc">A-Z</option>
          <option value="des">Z-A</option>
        </select>
      </div>

      <div>
        <select
          value={filters.population}
          onChange={(event) => {
            handleSortByOrderPopulation(event);
          }}>
          <option value="0" disabled>
            Order by population
          </option>
          <option value="lowest">Lowest to highest</option>
          <option value="highest">Highest to lowest</option>
        </select>
      </div>

      <div>
        <select
          value={filters.continents}
          onChange={(event) => handleFilterByContinent(event)}
          className={styles.select_continent}>
          <option value="0" disabled>
            Select a continent
          </option>
          <option value="ALL">All countries</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctica">Antarctica</option>
        </select>
      </div>

      <select
        value={filters.activities}
        onChange={(event) => handleFilterByActivity(event)}>
        {activitiesData.length === 0 ? (
          <option>No activities here</option>
        ) : (
          <>
            <option value="0" disabled>
              Select an activity
            </option>
            <option value="ALL">ALL</option>
            {activitiesData.map((act, index) => (
              <option key={index} value={act.name}>
                {act.name}
              </option>
            ))}
          </>
        )}
      </select>

      <div>
        <button
          className={styles.button_reload}
          onClick={() => {
            handleReload();
          }}>
          Reload filters
        </button>
      </div>
    </>
  );
};

export default Filters;
