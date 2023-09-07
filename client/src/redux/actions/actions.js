/* eslint-disable no-unused-vars */
import axios from "axios";

// Importamos las action types
import {
  GET_ACTIVITIES,
  GET_ALL_COUNTRIES,
  GET_COUNTRY_BY_DETAIL,
} from "../action types/actionTypes.js";

//---------------------------------------------- COUNTRIES------------------------------------------------------

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
      console.log(error.response.data);
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
      console.log(error);
      alert(error.response.data.error);
    }
  };
};

//---------------------------------------------- ACTIVITIES ------------------------------------------------------

//! Action creator para crear actividades

export const postActivity = (input) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/activities",
        input
      );
      alert("Your activity was created 😉"); //No hay type

      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
};

//! Action creator para traer a todas las actividades

export const getActivities = () => {
  return async function (dispatch) {
    const URL = "http://localhost:3001/activities";
    try {
      const response = await axios.get(`${URL}`);
      dispatch({
        type: GET_ACTIVITIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};
