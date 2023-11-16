/* eslint-disable no-unused-vars */
import axios from "axios";

// Importamos las action types
import {
  GET_ALL_ACTIVITIES,
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_DETAIL,
  CLEAN_DETAIL,
  DELETE_ACTIVIY,
  PUT_ACTIVITY,
  SEARCH_COUNTRY_BY_NAME,
  RELOAD_FILTERS,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  SORT_BY_ORDER_ABC,
  SORT_BY_POPULATION,
} from "../action types/actionTypes.js";

//************ COUNTRIES *****************************************/

//! Action para obtener todos los paises

export const getAllCountries = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/countries");
      dispatch({
        type: GET_ALL_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};

//! Action para obtener el detalle de un país

export const getCountryDetail = (id) => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/countries";
    try {
      const response = await axios.get(`${URL}/${id}`);
      dispatch({
        type: GET_COUNTRY_BY_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};

//! Action para limpiar el estado cuando desmonte el componente de DETAIl

export const cleanDetail = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAN_DETAIL,
    });
  };
};

//! Action para hacer el search por query

export const searchCountryByName = (name) => {
  return async function (dispatch) {
    const URL = `http://localhost:3001/countries?name=${name}`;
    try {
      const response = await axios.get(URL);
      dispatch({
        type: SEARCH_COUNTRY_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};

//************ ACTIVITIES *****************************************/

//! Action creator para crear actividades

export const postActivity = (input) => {
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/activities", input);
      alert("Your activity was created 😉");
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
};

//! Action creator para traer a todas las actividades

export const getAllActivities = () => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/activities";
    try {
      const response = await axios.get(`${URL}`);
      dispatch({
        type: GET_ALL_ACTIVITIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};

//! Action para eliminar una actividad

export const deleteActivity = (id) => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/activities";
    try {
      await axios.delete(`${URL}/${id}`);
      return dispatch({
        type: DELETE_ACTIVIY,
        payload: id,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};

//! Action para actualizar una actividad

export const putActivity = (payload) => {
  return async function (dispatch) {
    const activity = {
      id: payload.id,
      name: payload.name,
      difficulty: payload.difficulty,
      duration: payload.duration,
      season: payload.season,
      country: payload.countries,
    };
    const URL = "http://localhost:3001/activities";
    try {
      await axios.put(URL, activity);
      return dispatch({
        type: PUT_ACTIVITY,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};

//************ FILTERS *****************************************/

export const filterByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
};

export const filterByActivity = (payload) => {
  return {
    type: FILTER_BY_ACTIVITY,
    payload,
  };
};

//************ SORTING COUNTRIES ***************************************/

export const sortByOrderAbc = (payload) => {
  return {
    type: SORT_BY_ORDER_ABC,
    payload,
  };
};

export const sortByPopulation = (payload) => {
  return {
    type: SORT_BY_POPULATION,
    payload,
  };
};

//************ RELOAD FILTERS *****************************************/
export const reloadFilters = () => {
  return function (dispatch) {
    dispatch({
      type: RELOAD_FILTERS,
    });
  };
};
