import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect, useState } from "react";
import { RouteProps, useHistory } from "react-router";
import { PrimaryButton } from "~/components/Button";
import { BigCheckIcon, InfoIcon } from "~/components/Icon";
import { ProviderPreview } from "~/components/ProviderPreview";
import { Requirements } from "~/components/Requirements";
import { Title } from "~/components/Title";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";
import { useTypedSelector } from "~/reducers";

type Props = {} & RouteProps;

type State = {
  loading: boolean;
  creating: boolean;
  success: boolean;
  provider: any;
  error: any;
};

const HelpConfirmation = ({ match }) => {
  const { push } = useHistory();
  const providerId = parseInt(match.params.id);
  const user = useTypedSelector((state) => state.get("user"));
  const userData = user.get("data");
  const [state, setState] = useState<State>({
    loading: true,
    creating: false,
    success: false,
    provider: null,
    error: null
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(
          api.providers.show(providerId)
        );
        setState((s) => ({ ...s, loading: false, provider: response.data }));
      } catch (error) {
        console.log("ERROR GET PROVIDER", error);
        setState((s) => ({ ...s, loading: false, error: error }));
      }
    })();
  }, [providerId]);

  const inquireForProvider = () => {
    setState((s) => ({ ...s, creating: true }));
    axiosInstance
      .post(api.inquiries.collection, { providerId })
      .then(() => {
        setState((s) => ({ ...s, creating: false, success: true }));
      })
      .catch((error) => {
        console.log("ERROR GET PROVIDERS", error);
        setState((s) => ({ ...s, creating: false, error: error }));
      });
  };

  if (state.loading)
    return (
      <div className="h-100vh w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  if (state.success)
    return (
      <div className="h-100vh flex flex-col items-center p-4">
        <div className="h-20 w-full" />
        <BigCheckIcon />
        <Title as="h1" className="m-8 text-2xl">
          Der/Die Landwirt*in erhält eine Nachricht und meldet sich zeitnah bei
          dir!
        </Title>
        <PrimaryButton className="mt-20" block onClick={() => push("/map")}>
          Zurück zur Übersicht
        </PrimaryButton>
      </div>
    );

  const { provider, error, creating } = state;

  return (
    <div className="p-4 overflow-y-scroll">
      <Title as="h1" className="pb-8 text-xl">
        Hallo {userData.getIn(["account", "firstName"])}!
      </Title>
      <Requirements />
      <div className="p-4">
        <ProviderPreview provider={provider} mini={true} />
      </div>
      <div className="flex flex-row mb-8">
        <div className="flex">
          <InfoIcon size={24} />
        </div>
        <p className="mx-2">
          Durch Bestätigung erhält der/die Landwirt*in eine Nachricht und meldet
          sich zeitnah bei dir!
        </p>
      </div>
      {error && (
        <div className="mb-2 text-red-500 text-center">
          <p className="mb-2">Etwas ist schiefgelaufen</p>
          {error.response.status === 409 && (
            <p>Du hast hier bereits angefragt</p>
          )}
        </div>
      )}
      <PrimaryButton
        block
        disabled={creating}
        onClick={() => inquireForProvider()}
      >
        Jetzt helfen
      </PrimaryButton>
      <div className="h-20" />
    </div>
  );
};

export default HelpConfirmation;
