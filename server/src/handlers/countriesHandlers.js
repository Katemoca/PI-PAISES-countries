const {
  getAllCountries,
  getCountryByName,
  getCountryById,
} = require("../controllers/countriesControllers");

//! Arreglo de objetos con todos los paises (cada país tiene su propia información)
const getCountriesHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const countryNameResponse = await getCountryByName(name);
      return res.status(200).json(countryNameResponse);
    } else {
      const allCountries = await getAllCountries();
      res.status(200).json(allCountries);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! Objeto con la información pedida en el detalle de un país + datos de las actividades turísticas asociadas a este país
const getCountryIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length === 3) {
      const countryIdResponse = await getCountryById(id);
      return res.status(200).json(countryIdResponse);
    }
    res.status(400).send(`It must be a valid 3-letter country ID`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCountriesHandler,
  getCountryIdHandler,
};
