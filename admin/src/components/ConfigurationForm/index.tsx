import {
  Box,
  Button,
  ContentLayout,
  Flex,
  Grid,
  GridItem,
  HeaderLayout,
  SingleSelect,
  SingleSelectOption,
  Switch,
  TextInput,
  Typography,
} from "@strapi/design-system";
import { Check, Information } from "@strapi/icons";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { LoadingIndicatorPage, Form } from "@strapi/helper-plugin";

import { usePlugin } from "../../hooks/usePlugin";
import getTrad from "../../utils/getTrad";

const ConfigurationForm = () => {
  const { formatMessage } = useIntl();
  const { data, isLoading, submit } = usePlugin();
  const host = window.location.origin;
  const callbackURL = `${host}/admin-auth/auth0/login.html`;

  const handleUpdateSettingsSubmit = (body) => {
    submit.mutate({
      body,
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingIndicatorPage>
          {formatMessage({
            id: getTrad("loading"),
            defaultMessage: "Plugin settings are loading",
          })}
        </LoadingIndicatorPage>
      ) : (
        <Formik
          enableReinitialize
          initialValues={{
            callbackURL,
            enabled: data.configuration?.enabled,
            defaultRole: data.configuration?.role?.id,
          }}
          key="configuration-form"
          validateOnChange={false}
          onSubmit={handleUpdateSettingsSubmit}
        >
          {({
            handleChange,
            values,
            dirty,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Form>
              <HeaderLayout
                title={formatMessage({
                  id: getTrad("plugin.name"),
                  defaultMessage: "Auth0 Admin Login",
                })}
                subtitle={formatMessage({
                  id: getTrad("pages.SettingsPage.header.description"),
                  defaultMessage: "Configure the Auth0 Admin Login plugin",
                })}
                primaryAction={
                  <Button
                    type="submit"
                    key="submit-button"
                    startIcon={<Check />}
                    disabled={!dirty}
                  >
                    {formatMessage({
                      id: getTrad("pages.SettingsPage.Button.save"),
                      defaultMessage: "Save",
                    })}
                  </Button>
                }
              />
              <ContentLayout>
                <Box
                  background="neutral0"
                  hasRadius
                  shadow="filterShadow"
                  paddingTop={6}
                  paddingBottom={6}
                  paddingLeft={7}
                  paddingRight={7}
                >
                  <Flex direction="column" alignItems="stretch" gap={4}>
                    <Typography variant="delta" as="h2">
                      {formatMessage({
                        id: "global.settings",
                        defaultMessage: "Settings",
                      })}
                    </Typography>
                    <Grid gap={5}>
                      <GridItem col={1} s={3}>
                        <Typography variant="omega" as="h4" lineHeight="6">
                          {formatMessage({
                            id: getTrad("pages.SettingsPage.Enabled.label"),
                            defaultMessage: "Plugin Enabled",
                          })}
                        </Typography>
                      </GridItem>
                      <GridItem col={6} s={6}>
                        <Switch
                          name="enabled"
                          selected={values.enabled}
                          onChange={() => {
                            const newValue = !values.enabled;
                            setFieldValue("enabled", newValue, false);
                            setFieldTouched("enabled", false, false);
                          }}
                          paddingLeft={7}
                          paddingRight={7}
                        />
                      </GridItem>
                      <GridItem col={6} s={12}>
                        <TextInput
                          label={formatMessage({
                            id: getTrad("pages.SettingsPage.CallbackURL.label"),
                            defaultMessage: "Auth0 Callback URL",
                          })}
                          name="callbackURL"
                          hint={formatMessage({
                            id: getTrad("pages.SettingsPage.CallbackURL.hint"),
                            defaultMessage:
                              "Copy the following URL and paste it into the Allowed Callback URLs field in your Auth0 provider",
                          })}
                          value={values.callbackURL}
                          editable={false}
                          labelAction={<Information aria-hidden />}
                        />
                      </GridItem>
                      <GridItem col={6} s={12}>
                        <SingleSelect
                          required
                          name="defaultRole"
                          key="defaultRole"
                          value={values.defaultRole}
                          onChange={(value) => {
                            !value && setFieldValue("enabled", false, false);

                            setFieldValue("defaultRole", value, false);
                            setFieldTouched("defaultRole", false, false);
                          }}
                          error={
                            !values.defaultRole
                              ? formatMessage({
                                  id: "components.Input.error.validation.required",
                                  defaultMessage: "This field is required.",
                                })
                              : null
                          }
                          label={formatMessage({
                            id: getTrad("pages.SettingsPage.DefaultRole.label"),
                            defaultMessage: "Default Admin Role",
                          })}
                          placeholder={formatMessage({
                            id: getTrad(
                              "pages.SettingsPage.DefaultRole.placeholder"
                            ),
                            defaultMessage: "Select admin role",
                          })}
                          hint={formatMessage({
                            id: getTrad("pages.SettingsPage.DefaultRole.hint"),
                            defaultMessage: "Default Admin Role",
                          })}
                        >
                          {data.roles.map((role) => (
                            <SingleSelectOption key={role.id} value={role.id}>
                              {formatMessage({
                                id: getTrad(`role.${role.name}`),
                                defaultMessage: role.name,
                              })}
                            </SingleSelectOption>
                          ))}
                        </SingleSelect>
                      </GridItem>
                    </Grid>
                  </Flex>
                </Box>
              </ContentLayout>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ConfigurationForm;
