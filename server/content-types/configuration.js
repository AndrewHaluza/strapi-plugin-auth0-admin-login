module.exports = {
  kind: "singleType",
  collectionName: "authzero_admin_login_configurations",
  info: {
    singularName: "authzero-admin-login-configuration",
    pluralName: "authzero-admin-login-configurations",
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
