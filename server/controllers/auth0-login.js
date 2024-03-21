"use strict";

const {
  errors: { ForbiddenError },
} = require("@strapi/utils");
const fs = require("fs");
const path = require("path");

module.exports = ({ strapi }) => ({
  async getLoginPage(ctx) {
    const configuration = await strapi
      .query("plugin::auth0-admin-login.authzero-admin-login-configuration")
      .findOne({
        populate: {
          role: { select: "id" },
        },
      });

    if (!configuration.enabled) {
      throw new ForbiddenError("Auth0 Admin Login plugin is not enabled");
    }

    const user = await strapi
      .plugin("users-permissions")
      .service("providers")
      .connect("auth0", ctx.query);

    if (user.blocked) {
      throw new ForbiddenError(
        "Your account has been blocked by an administrator"
      );
    }

    const adminUserService = strapi.admin.services.user;
    let adminUser = await adminUserService.findOneByEmail(user.email);

    if (adminUser) {
      if (!adminUser.blocked) {
        throw new ForbiddenError(
          "Your account has been blocked by an administrator"
        );
      }

      if (!adminUser.isActive) {
        throw new ForbiddenError(
          "Your account is inactive. Please contact an administrator to activate your account."
        );
      }
    } else {
      const roles = [];

      if (configuration?.role?.id) {
        roles.push(configuration.role.id);
      }

      adminUser = await adminUserService.create({
        email: user.email,
        username: user.username,
        isActive: true,
        blocked: false,
        roles: roles,
      });
    }

    const token = strapi.admin.services.token.createJwtToken(adminUser);
    const sanitizedAdminUser =
      strapi.admin.services.user.sanitizeUser(adminUser);
    const loginHtmlPath = path.join(__dirname, "../assets/login.html");
    const loginHtml = fs.readFileSync(loginHtmlPath, "utf8");
    const interpolatedHtml = loginHtml
      .replace("$TOKEN$", token)
      .replace(
        "$USER$",
        JSON.stringify(sanitizedAdminUser).replaceAll(`"`, `!!**`)
      );

    ctx.set("Content-Type", "text/html");
    ctx.send(interpolatedHtml);
  },

  getLoginScript(ctx) {
    const loginJsPath = path.join(__dirname, "../assets/login.js");
    const loginJs = fs.readFileSync(loginJsPath, "utf8");

    ctx.set("Content-Type", "text/javascript");
    ctx.send(loginJs);
  },
});
