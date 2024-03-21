module.exports = {
  kind: "singleType",
  collectionName: "auth0_admin_login_configurations",
  info: {
    singularName: "auth0-admin-login-configuration",
    pluralName: "auth0-admin-login-configurations",
    displayName: "Auth0 Login Configuration",
    description: "Configuration for Auth0 Login plugin",
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    "content-manager": {
      visible: false,
    },
    "content-type-builder": {
      visible: false,
    },
  },
  attributes: {
    enabled: {
      type: "boolean",
      required: true,
      default: false,
    },
    role: {
      type: "relation",
      relation: "oneToOne",
      target: "admin::role",
    },
  },
};
