const axios = require("axios");
const { Country } = require("../src/db");
// const { cleanedCountryName } = require("./dbValidations");

const apiUrl = "http://localhost:5000/countries";

const fetchCountries = async () => {
  try {
    //Traemos info de la api
    const response = (await axios.get(apiUrl)).data;
    // Verificamos si hay info si no lanzamos un error
    if (!response) throw new Error("No countries were found");

    // Array vacío para almacenar los países formateados desde la api
    let countriesApiToDb = [];

    // "Formateamos" los datos con un map()
    const apiRequest = response.map(async (country) => {
      const newCountries = {
        id: country.cca3?.toUpperCase(),
        name: country.name.common || "The name of this country wasn't found",
        flags: country.flags.png || "The flag image wans't found",
        continents: country.continents?.[0] || "The continent wasn't found",
        capital: country.capital?.[0] || "The capital wasn't found",
        subregion:
          country.subregion && country.subregion
            ? country.subregion
            : "The subregion wasn't found",
        area: country.area && !isNaN(country.area) ? country.area : 0,
        population: !isNaN(country.population) ? country.population : 0,
      };
      return newCountries;
    });
    // Almacenamos todos los paises ya estructurados y los traemos con un Promise.all()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    countriesApiToDb = await Promise.all(apiRequest);
    //Se trae la query con todos los paises y se crea en la bd
    await Country.bulkCreate(countriesApiToDb, { validate: false });
    console.log(
      `${countriesApiToDb.length} coutries were saved in the database`
    );
  } catch (error) {
    console.log("Error saving countries in database: ", error);
    if (error.errors) {
      console.log("Validation errors: ");
      error.errors.forEach((err) => {
        console.log(err.message);
      });
    }
  }
};

module.exports = { fetchCountries };

// Sequelize => bulkCreate() => However, by default, bulkCreate does not run validations on each object that is going to be created (which create does). To make bulkCreate run these validations as well, you must pass the validate: true option.
