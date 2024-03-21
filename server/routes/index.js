module.exports = [
  {
    handler: "auth0LoginController.getLoginPage",
    method: "GET",
    path: "/admin-auth/auth0/login.html",
    config: {
      auth: false,
      prefix: "",
      middlewares: ["plugin::users-permissions.rateLimit"],
    },
  },
  {
    handler: "auth0LoginController.getLoginScript",
    method: "GET",
    path: "/admin-auth/auth0/login.js",
    config: {
      auth: false,
      prefix: "",
      middlewares: ["plugin::users-permissions.rateLimit"],
    },
  },
  {
    handler: "configurationController.getConfiguration",
    method: "GET",
    path: "/auth0-admin-login/configuration",
    config: {
      prefix: "",
      middlewares: ["plugin::users-permissions.rateLimit"],
    },
  },
  {
    handler: "configurationController.setConfiguration",
    method: "PUT",
    path: "/auth0-admin-login/configuration",
    config: {
      prefix: "",
      middlewares: ["plugin::users-permissions.rateLimit"],
    },
  },
];
