const { Router } = require("express");
const countriesRoutes = require("./countriesRoutes");
const activitiesRoutes = require("./activitiesRoutes");

const mainRouter = Router();

mainRouter.use("/countries", countriesRoutes);
mainRouter.use("/activities", activitiesRoutes);

module.exports = mainRouter;
