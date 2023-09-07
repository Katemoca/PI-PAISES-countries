const { Country, Activity } = require("../db");
const { isValidUuid } = require("../../helpers/isValidUuid");
const { Op } = require("sequelize");

//! Obtenemos todas las actividades
const getAllActivities = async () => {
  const activities = await Activity.findAll({
    include: {
      model: Country,
      as: "countries",
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  if (activities.length) {
    return activities;
  }
  throw new Error("No activities were found");
};

//! Función para buscar actividades por nombre
const getActivityByName = async (name) => {
  if (name) {
    const activityByName = await Activity.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Country,
        as: "countries",
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    if (!activityByName.length) {
      throw new Error(`There's no activity with the name ${name}`);
    }
    return activityByName;
  }
  return getAllActivities();
};

//!Obtenemos una actividad por id (uuid)
const getActivityById = async (id) => {
  if (isValidUuid(id)) {
    const activityById = await Activity.findByPk(id, {
      include: {
        model: Country,
        as: "countries",
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    if (activityById) {
      return activityById;
    }
    throw new Error("ID not found");
  }
};

//! Creamos las actividades y tenemos en cuenta la relación con los paises (utilizamos el método set())
const createActivity = async (
  name,
  difficulty,
  duration,
  season,
  countries
) => {
  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });
  await newActivity.setCountries(countries);
  return newActivity;
};

//! Modificamos una actividad que ya existe
const updateActivities = async (
  id,
  name,
  difficulty,
  duration,
  season,
  countries
) => {
  // Buscamos si la actividad existe
  const updatedActivity = await Activity.findByPk(id);
  if (!updatedActivity) {
    throw new Error(`Activity not found`);
  }

  // Obtenemos los datos de la actividad para actualizarlos
  await updatedActivity.update({
    name,
    difficulty,
    duration,
    season,
    countries,
  });
  return updatedActivity;
};

//!Borramos una actividad y el país que tiene relacionado
const deleteActivityById = async (id) => {
  if (id) {
    const deletedActivity = await Activity.destroy({ where: { id } });
    return deletedActivity;
  }
  throw new Error(`The ID ${id} wasn't found`);
};

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  createActivity,
  updateActivities,
  deleteActivityById,
};
