const { Router } = require("express");
const {
  getActivitiesHandler,
  getActivityByIdHandler,
  createActivitiesHandler,
  deleteActivityByIdHandler,
  updateActivitiesHandler,
} = require("../handlers/activitiesHandlers");

const activitiesRoutes = Router();

activitiesRoutes.get("/", getActivitiesHandler);
activitiesRoutes.get("/:id", getActivityByIdHandler);
activitiesRoutes.post("/", createActivitiesHandler);
activitiesRoutes.put("/:id", updateActivitiesHandler);
activitiesRoutes.delete("/:id", deleteActivityByIdHandler);

module.exports = activitiesRoutes;
