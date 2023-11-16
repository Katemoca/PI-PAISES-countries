/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import {
  GET_ALL_ACTIVITIES,
  GET_ACTIVITY_DETAIL,
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_DETAIL,
  PUT_ACTIVITY,
  CLEAN_DETAIL,
  SEARCH_COUNTRY_BY_NAME,
  RELOAD_FILTERS,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  SORT_BY_ORDER_ABC,
  SORT_BY_POPULATION,
  DELETE_ACTIVIY,
} from "../action types/actionTypes";

let initialState = {
  countries: [],
  countriesBackUp: [],
  detailCountries: {},
  activities: [],
  activitiesBackUp: [],
  activityDetail: {},
  filterActivity: "ALL",
  filterContinent: "ALL",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesBackUp: action.payload,
      };

    case GET_COUNTRY_BY_DETAIL:
      return {
        ...state,
        detailCountries: action.payload,
      };

    case SEARCH_COUNTRY_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        activitiesBackUp: action.payload,
      };

    case GET_ACTIVITY_DETAIL:
      return {
        ...state,
        activityDetail: action.payload,
      };

    case DELETE_ACTIVIY:
      const updatedDeletedActivities = state.activities.filter(
        (act) => act.id === action.payload
      );
      return {
        ...state,
        activities: updatedDeletedActivities,
      };

    case PUT_ACTIVITY:
      return {
        ...state,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        detailCountries: {},
        activityDetail: {},
      };

    case FILTER_BY_CONTINENT:
      let filteredContinent =
        action.payload === "ALL"
          ? state.countriesBackUp
          : state.countriesBackUp.filter(
              (country) => country.continents === action.payload
            );
      if (state.filterActivity !== "ALL") {
        filteredContinent = filteredContinent.filter((country) =>
          country.activities.find((act) => act.name === state.filterActivity)
        );
      }

      return {
        ...state,
        countries: filteredContinent,
        filterContinent: action.payload,
      };

    case FILTER_BY_ACTIVITY:
      let filteredActivity =
        action.payload === "ALL"
          ? state.countriesBackUp.filter(
              (country) => country.activities && country.activities.length > 0
            )
          : state.countriesBackUp.filter(
              (country) =>
                country.activities &&
                country.activities.find(
                  (actFound) => actFound.name === action.payload
                )
            );
      if (state.filterContinent !== "ALL") {
        filteredActivity = filteredActivity.filter(
          (country) => country.continents === state.filterContinent
        );
      }

      return {
        ...state,
        countries: filteredActivity,
        filterActivity: action.payload,
      };

    case SORT_BY_ORDER_ABC:
      let orderedCountriesAbc =
        action.payload === "asc"
          ? [...state.countries].sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : [...state.countries].sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            });

      return {
        ...state,
        countries: orderedCountriesAbc,
      };

    case SORT_BY_POPULATION:
      let orderedCountriesPopulation =
        action.payload === "lowest"
          ? [...state.countries].sort((a, b) => a.population - b.population)
          : [...state.countries].sort((a, b) => b.population - a.population);

      return {
        ...state,
        countries: orderedCountriesPopulation,
      };

    case RELOAD_FILTERS:
      return {
        ...state,
        filterActivity: "ALL",
        filterContinent: "ALL",
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
