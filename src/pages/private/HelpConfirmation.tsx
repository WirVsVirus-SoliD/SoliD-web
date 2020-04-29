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
  error: object;
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
        //const response = await axiosInstance.get(api.providers.show(providerId));
        const response = await axiosInstance.get(api.providers.collection);
        const feature = response.data.features.find(
          (feature) => feature.properties.providerId === providerId
        );
        setState({ ...state, loading: false, provider: feature.properties });
      } catch (error) {
        console.log("ERROR GET PROVIDER", error);
        setState({ ...state, loading: false, error: error });
      }
    })();
  }, []);

  const inquireForProvider = () => {
    setState({ ...state, creating: true });
    axiosInstance
      .post(api.inquiries.collection, { providerId })
      .then(() => {
        setState({ ...state, creating: false, success: true });
      })
      .catch((error) => {
        console.log("ERROR GET PROVIDERS", error);
        setState({ ...state, creating: false, error: error });
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
        <BigCheckIcon />
        <Title as="h1" className="m-8 text-2xl">
          Der/Die Landwirt*in erhält eine Nachricht und meldet sich zeitnah bei
          dir!
        </Title>
        <PrimaryButton block onClick={() => push("/map")}>
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
      {error && <p className="mb-2 text-red-500">Etwas ist schiefgelaufen</p>}
      <PrimaryButton
        block
        disabled={creating}
        onClick={() => inquireForProvider()}
      >
        Jetzt helfen
      </PrimaryButton>
    </div>
  );
};

export default HelpConfirmation;
