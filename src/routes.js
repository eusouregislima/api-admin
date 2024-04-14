const { Router } = require("express");
const routes = new Router();

const CreateAdministratorController = require("./app/controllers/adm/CreateAdministratorController");
const SessionAdministratorController = require("./app/controllers/adm/SessionAdministratorController");
const isAdminAuthenticated = require("./app/middlewares/isAdminAuthenticated");
const ListAdministratorController = require("./app/controllers/adm/ListAdministratorController");
const ListAllCustomersController = require("./app/controllers/adm/ListAllCustomersController");
const ListAllCustomerDataController = require("./app/controllers/adm/ListAllCustomerDataController");

routes.post("/admin", CreateAdministratorController.store);
routes.post("/admin/session", SessionAdministratorController.store);
routes.get("/admin/admin", isAdminAuthenticated.handleAuthentication, ListAdministratorController.show);
routes.get("/admin/auth", isAdminAuthenticated.handleAuthentication, function (req, res) {
  return res.status(200).json({ "isAuthenticated": true });
});

routes.get("/admin/allcustomers", isAdminAuthenticated.handleAuthentication, ListAllCustomersController.index);

routes.get("/admin/quadro-administrativo/cliente/:id", isAdminAuthenticated.handleAuthentication, ListAllCustomerDataController.index);

routes.get("/admin/health", async (_req, res, _next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Health OK",
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send();
  }
});

routes.get("/admin", async (_req, res, _next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Admin ok",
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send();
  }
});

module.exports = routes;