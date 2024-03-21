# Strapi plugin Auth0 Admin Login

Adds possibility to authorize into Strapi Admin Panel with Auth0.


- [🚦 Current Status](#current-status)

- [✨ Features](#features)

- [🤔 Motivation](#motivation)

- [🖐 Requirements](#requirements)

- [⏳ Installation](#installation)

- [🔧 Configuration](#configuration)

- [Contributing](#contributing)

- [License](#license)

## 🚦 Current Status

For more information on contributing please see [the contrib message below](#contributing).

## ✨ Features

These are the primary features that are finished or currently being worked on:

- [x] Login\Register to the Admin Panel with Auth0

- [x] Choose Admin Role for registered via such way

- [x] Localization-friendly. Supported EN, UK and allows add custom translations. Localization key for roles `authzero-admin-login.role.$ROLE$`

## 🤔 Motivation

The purpose of this plugin is to have a easy way to login users via secured Auth0 or register if it's new.

There are no alternatives currently and customization of Strapi Admin side is quite hard.

## 🖐 Requirements

**This plugin basically should works with 4.x.x versions, but not tested**


| Strapi Version | Supported | Tested On     |

| -------------- | --------- | ------------- |

| v3             | ❌        | N/A           |

| <=v4.16.2      | ❓        | N/A           |

| >=v4.16.2      | ✅        | May 2024      |

i
## ⏳ Installation

Install the plugin in your Strapi project or your Strapi plugin.

```bash

npm install strapi-plugin-auth0-admin-login

```

## 🔧 Configuration

### Step 1: standard strapi plugin config

add the following config to your `config/plugins.js`

```js
module.exports = () => {
  return {
    "auth0-admin-login": {
      enabled: true,
    },
  };
};
```
### Step 2: configure mandatory fields on UI

On the UI configuration page - [http://localhost:1337/admin/plugins/authzero-admin-login](http://localhost:1337/admin/plugins/authzero-admin-login)
- Setup default role and enable toggle


![Plugin Configuration Page](/docs/plugin-configurations.png)

- Copy `Auth0 Callback URL` and paste it to `The redirect URL to your front-end app` field on the Strapi Auth0 Provider Configuration page - [http://localhost:1337admin/settings/users-permissions/providers](http://localhost:1337admin/settings/users-permissions/providers)


![Strapi Auth0 Configuration Page](/docs/auth0-configuration.png)


## Contributing

Please open issues before making a pull request so that we can talk about what you want to change for the best results.
Issues are submitted to [https://github.com/AndrewHaluza/strapi-plugin-auth0-admin-login/issues](https://github.com/AndrewHaluza/strapi-plugin-auth0-admin-login/issues). Please provide as much information as possible about the bug or feature request.

## License

MIT
