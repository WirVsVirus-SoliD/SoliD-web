import CloseIcon from "@material-ui/icons/Close";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import React from "react";
import { useHistory } from "react-router";
import { ReactComponent as OrganicAgriculture } from "~/assets/icons/OrganicAgriculture.svg";
import { PrimaryButton } from "~/components/Button";
import { Crop } from "~/components/Crop";
import { Title } from "~/components/Title";

const ProviderPreview = ({ providerGeoJson, setHighlighted }) => {
  const { push } = useHistory();
  const properties = providerGeoJson.properties;
  const { city, street, housenr, zip } = properties.address;
  return (
    <div className="bg-white p-3">
      <div className="flex flex-row pb-6">
        <Title as="h1" className="pr-2">
          {properties.farmName}
        </Title>
        {/* FIXME: organic flag from backend */}
        {!properties.organic && <OrganicAgriculture />}
        <CloseIcon
          className="ml-auto mr-2"
          onClick={() => setHighlighted(null)}
        />
      </div>
      <div className="flex flex-row pb-6">
        <LocationOnOutlinedIcon className="mr-2" />
        <p>{`${street} ${housenr}, ${zip} ${city}`}</p>
      </div>
      {properties.pickupPossible && (
        <div className="flex flex-row pb-6">
          <DirectionsCarIcon className="mr-2" />
          <p>{`Abholung möglich bei max. ${properties.pickupRange}km Distanz`}</p>
        </div>
      )}
      <div className="flex flex-row pb-6">
        <ScheduleOutlinedIcon className="mr-2" />
        <p>{`Mindestbeschäftigung: ${properties.minWorkPeriod}`}</p>
      </div>
      <div className="flex flex-row">
        {properties.crops.slice(0, 2).map((crop) => (
          <div key={crop} className="mr-2">
            <Crop type={crop} />
          </div>
        ))}
        {properties.crops.length > 2 && (
          <div className="flex mr-2 items-center">
            <MoreHorizIcon />
          </div>
        )}
        <PrimaryButton
          onClick={() => push(`/providers/${properties.providerId}`)}
        >
          Mehr Infos
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ProviderPreview;
