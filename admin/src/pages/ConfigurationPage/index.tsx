import { Main } from "@strapi/design-system";
import { CheckPagePermissions } from "@strapi/helper-plugin";

import ConfigurationForm from "../../components/ConfigurationForm";
import { PERMISSIONS } from "../../constants";

const ConfigurationPage = () => (
  <CheckPagePermissions permissions={PERMISSIONS.readProviders}>
    <Main>
      <ConfigurationForm />
    </Main>
  </CheckPagePermissions>
);

export default ConfigurationPage;
