import {
  useAPIErrorHandler,
  useFetchClient,
  useNotification,
} from "@strapi/helper-plugin";
import { useMutation, useQuery } from "react-query";

import getTrad from "../utils/getTrad";

export const usePlugin = () => {
  const { put, get } = useFetchClient();
  const toggleNotification = useNotification();
  const { formatAPIError } = useAPIErrorHandler();

  const {
    isLoading,
    isError,
    data = { roles: [], configuration: null },
    refetch,
    error,
  } = useQuery(["admin"], async () => {
    const { data } = await get(`/authzero-admin-login/configuration`);

    return data;
  });

  const handleSuccess = (type, tradId, defaultMessage) => {
    refetch();
    toggleNotification({
      type,
      message: { id: getTrad(tradId), defaultMessage },
    });
  };

  const handleError = (err) => {
    toggleNotification({
      type: "warning",
      message: formatAPIError(err),
    });
  };

  const submit = useMutation(
    ({ body }: { body: { defaultRole: number } }) =>
      put(`/authzero-admin-login/configuration`, body),
    {
      onSuccess: () =>
        handleSuccess(
          "success",
          "notification.update.success",
          "Successfully updated settings"
        ),
      onError: handleError,
    }
  );

  return {
    data,
    isLoading,
    isError,
    submit,
  };
};
