"use strict";

module.exports = ({ strapi }) => ({
  async getConfiguration(ctx) {
    const [configuration, roles] = await Promise.all([
      strapi
        .query(
          "plugin::auth0-admin-login.auth0-admin-login-configuration"
        )
        .findOne({
          populate: {
            role: { select: "id" },
          },
        }),
      strapi.admin.services.role.find(),
    ]);

    return {
      configuration,
      roles,
    };
  },

  async setConfiguration(ctx) {
    const { enabled, defaultRole } = ctx.request.body;

    const isCouldBeEnabled = defaultRole !== null;

    const pluginConfiguration = strapi.query(
      "plugin::auth0-admin-login.auth0-admin-login-configuration"
    );

    const savedConfiguration = await pluginConfiguration.findOne();

    const updateData = {
      enabled: isCouldBeEnabled && enabled,
      role: defaultRole,
    };
    let response;

    if (!savedConfiguration) {
      response = await pluginConfiguration.create({ data: updateData });
    } else {
      response = await pluginConfiguration.update({
        where: { id: savedConfiguration.id },
        data: updateData,
      });
    }

    return response;
  },
});
