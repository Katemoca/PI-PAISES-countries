const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

//! Función para obtener todos los países con sus actividades asociadas

const getAllCountries = async () => {
  const allCountries = await Country.findAll({
    include: {
      model: Activity,
      as: "activities", // usamos un alias para la propiedad que incluye las actividades del modelo Activity
      attributes: ["id", "name", "difficulty", "duration", "season"],
      through: { attributes: [] }, // excluir los atributos de la tabla intermedia en la respuesta
    },
  });
  if (allCountries.length) {
    return allCountries;
  }
  throw new Error("There aren't any countries");
};

//! Función para buscar países por nombre

const getCountryByName = async (name) => {
  if (name) {
    const countryByName = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Activity,
        as: "activities",
        attributes: ["name", "difficulty", "duration", "season"],
        through: { attributes: [] },
      },
    });
    if (!countryByName.length) {
      throw new Error(`There's no country with the name ${name}`);
    }
    return countryByName;
  }
  return getAllCountries();
};

//! Función para obtener un país por su ID(cca3)

const getCountryById = async (id) => {
  if (id) {
    const countryById = await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
        as: "activities",
        attributes: ["id", "name", "difficulty", "duration", "season"],
        through: { attributes: [] },
      },
    });
    if (countryById) {
      return countryById;
    } else {
      throw new Error(`The id ${id} wasn't found`);
    }
  }
};

module.exports = {
  getAllCountries,
  getCountryByName,
  getCountryById,
};
