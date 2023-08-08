const { Router } = require("express");
const {
  getCountriesHandler,
  getCountryIdHandler,
} = require("../handlers/countriesHandlers");

const countriesRoutes = Router();

// Definición de rutas para manejar solicitudes HTTP(CRUD)

// GET => QUERY + ALL COUNTRIES
countriesRoutes.get("/", getCountriesHandler);

// GET + ID(params) + DETAIL
countriesRoutes.get("/:id", getCountryIdHandler);

module.exports = countriesRoutes;
