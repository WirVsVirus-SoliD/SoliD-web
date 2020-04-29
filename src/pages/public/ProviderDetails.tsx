import CircularProgress from "@material-ui/core/CircularProgress";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import EuroIcon from "@material-ui/icons/Euro";
import HotelIcon from "@material-ui/icons/Hotel";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import React, { useEffect, useState } from "react";

import { ArrowLeft, Globe, Heart, Share2 } from "react-feather";
import { RouteProps, useHistory } from "react-router";
import { ReactComponent as OrganicAgriculture } from "~/assets/icons/OrganicAgriculture.svg";
import { PrimaryButton } from "~/components/Button";
import { Crop } from "~/components/Crop";
import { InfoIcon } from "~/components/Icon";

import { Title } from "~/components/Title";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";
import ProviderDetailsSection from "~/pages/public/components/ProviderDetailsSection";

type Props = {} & RouteProps;

type State = {
  loading: boolean;
  provider: any;
  error: object;
};

const ProviderDetails = ({ match }) => {
  const [state, setState] = useState<State>({
    loading: true,
    provider: null,
    error: null
  });
  const { push } = useHistory();
  const providerId = parseInt(match.params.id);

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
  }, [providerId, state]);

  if (state.loading)
    return (
      <div className="h-100vh w-full flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  const isOrganicFarm = true;
  const { provider } = state;
  const { city, street, housenr, zip } = provider.address;

  return (
    <div className="h-full">
      <div className="relative">
        <div className="flex justify-between absolute top-0 left-0 right-0 p-2 text-brand">
          <button
            className="rounded-full bg-white-primary p-2"
            onClick={() => push("/map")}
          >
            <ArrowLeft size={20} />
          </button>
          {false && (
            <div>
              <button className="rounded-full bg-white-primary p-2 mr-2">
                <Heart size={20} />
              </button>

              <button className="rounded-full bg-white-primary p-2">
                <Share2 size={20} />
              </button>
            </div>
          )}
        </div>
        {/* TODO Platzhalterbild einfügen */}
        <img
          className="w-full"
          alt="Platzhalterbild"
          src={api.media.downloadPicture(providerId)}
        />
      </div>
      <div className="px-4 pt-4">
        <Title as="h2" className="text-2xl mb-2">
          {provider.farmName}
        </Title>
        <ul className="text-sm mb-4">
          <li className="flex items-center mb-2">
            <LocationOnOutlinedIcon className="mr-2" />
            <p>{`${street} ${housenr}, ${zip} ${city}`}</p>
          </li>
          {provider.pickupPossible && (
            <li className="flex items-center mb-2">
              <DirectionsCarIcon className="mr-2" />
              <p>{`Abholung möglich bei max. ${provider.pickupRange}km Distanz`}</p>
            </li>
          )}
          <li className="flex items-center mb-2">
            <ScheduleOutlinedIcon className="mr-2" />
            <p>{`Mindestbeschäftigung: ${provider.minWorkPeriod}`}</p>
          </li>
          <li className="flex items-center mb-2">
            <EuroIcon className="mr-2" />
            <p>{`${provider.hourlyRate.toFixed(2)} € / Stunde`}</p>
          </li>
          {provider.overnightPossible && provider.overnightPrice && (
            <li className="flex items-center mb-2">
              <HotelIcon className="mr-2" />
              <p>{`Übernachtungsmöglichkeit: ${provider.overnightPrice.toFixed(
                2
              )} € / Nacht`}</p>
            </li>
          )}
        </ul>

        <ul className="flex items-center text-xs mb-4">
          {isOrganicFarm && (
            <li className="inline-block text-center border-r border-gray-400 pr-4 mr-4">
              <OrganicAgriculture className="mx-auto mb-1" />
              Biologischer <br />
              Anbau
            </li>
          )}
          {provider.crops.map((crop) => (
            <li className="inline-block mr-4">
              <Crop type={crop} />
            </li>
          ))}
        </ul>
        {provider.url && (
          <div className="mb-4 text-center">
            <a
              href={provider.url}
              rel="noopener noreferrer"
              className="inline-flex items-center text-brand hover:text-white hover:bg-brand px-2 py-1 rounded"
            >
              <Globe className="mr-1" />
              Webseite
            </a>
          </div>
        )}
        <ProviderDetailsSection
          title={"Tätigkeiten"}
          text={provider.workActivities}
        />
        <ProviderDetailsSection
          title={"Arbeitsbeginn"}
          text={provider.workingConditions}
        />
        <ProviderDetailsSection
          title={"Übernachtungsmöglichkeiten"}
          text={provider.overnightInformation}
        />
        <ProviderDetailsSection
          title={"Versorgung"}
          text={provider.providingInformation}
        />
        <ProviderDetailsSection title={"Sprachen"} text={provider.languages} />
        <ProviderDetailsSection
          title={"Sonstiges"}
          text={provider.otherInformation}
        />

        <div className="pt-2">
          <InfoIcon size={24} />
          <p className="font-medium mt-2">
            Bitte beachte: Feldarbeit kann unter Umständen sehr anstrengend und
            belastend sein. Du solltest keine Probleme mit häufigem Bücken und
            längerer körperlicher Anstrengung haben.
          </p>
        </div>
        <PrimaryButton className="my-4" block>
          Ich will helfen
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ProviderDetails;
