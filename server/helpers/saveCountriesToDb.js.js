// Para hacer solicitudes a la API
const axios = require("axios");
const { Country } = require("../src/db");

// Guardamos la URL de donde se traen los países
const apiUrl = "http://localhost:5000/countries";

// Formateamos la estructura de la información que se trae

const cleanedCountryData = (countryData) => {
  return {
    id: countryData.cca3,
    name:
      countryData.name.official ||
      countryData.name.common ||
      "No name was found",
    flags:
      countryData.flags.png ||
      countryData.flags.svg ||
      "No flag image was found",
    continents:
      Object.values(countryData.continents).toString() ||
      "No continents were found",
    capital: countryData.capital?.[0] || "No capital was found",
    subregion: countryData.subregion || "No subregion was found",
    area: Number.isInteger(countryData.area) ? countryData.area : 0,
    population: Number.isInteger(countryData.population)
      ? countryData.population
      : 0,
  };
};

// Guardamos la info en la DB
const saveCountriesToDb = async () => {
  try {
    // Solicitud http para traer datos de los paises y la guardamos como respuesta
    const response = (await axios.get(apiUrl)).data;

    // Formateamos la respuesta con la función "cleanedCountryData"
    const countries = response.map((countryData) =>
      cleanedCountryData(countryData)
    );

    // Consultamos la BD para saber los paises existentes
    const existingCountriesInDb = await Country.findAll();

    // Filtramos los nuevos países que no están presentes en la base de datos
    const newCountries = countries.filter((country) => {
      return !existingCountriesInDb.find(
        (existingCountry) => existingCountry.id === country.id
      );
    });
    // Utilizamos bulkCreate() para insertar todos los nuevos paises en conjunto
    // Checamos si hay nuevos paises en la base de datos
    if (newCountries.length > 0) {
      await Country.bulkCreate(newCountries);
      console.log(`${newCountries.length} countries saved to the database`);
    } else {
      console.log("No new countries to save in the database.");
    }
  } catch (error) {
    // En caso de error, mostramos el mensaje de error en la consola
    console.log("Error saving countries in database:", error);
  }
};

//Exportamos la función y la llevamos a la configuración del servidor (server.js)
module.exports = { saveCountriesToDb };
