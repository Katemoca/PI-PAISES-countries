const {
  getAllActivities,
  getActivityById,
  getActivityByName,
  createActivity,
  updateActivities,
  deleteActivityById,
} = require("../controllers/activitiesControllers");

//! Arreglo con todas las actividades (cada país tiene su propia información) + obtener actividad por QUERY (name)
const getActivitiesHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const activityNameResponse = await getActivityByName(name);
      return res.status(200).json(activityNameResponse);
    } else {
      const allActivities = await getAllActivities();
      res.status(200).json(allActivities);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! Obtenemos una actividad por ID
const getActivityByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const responseActivityId = await getActivityById(id);
    return res.status(200).json(responseActivityId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! Nueva actividad creada
const createActivitiesHandler = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    const response = await createActivity(
      name,
      difficulty,
      duration,
      season,
      countries
    );
    console.log("The user was created");
    return res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! Modificamos una actividad existente
const updateActivitiesHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, difficulty, duration, season, countries } = req.body;
    const updateActivity = await updateActivities(
      id,
      name,
      difficulty,
      duration,
      season,
      countries
    );
    return res.status(200).json(updateActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! Borramos una actividad por su ID
const deleteActivityByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteActivityById(id);
    return res.status(200).send("Activity was eliminated");
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

module.exports = {
  getActivitiesHandler,
  getActivityByIdHandler,
  createActivitiesHandler,
  updateActivitiesHandler,
  deleteActivityByIdHandler,
};
