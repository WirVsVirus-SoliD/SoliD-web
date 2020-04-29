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

type Props = {
  provider: any;
  setHighlighted?: Function;
  mini?: boolean;
};

const ProviderPreview = ({ provider, mini = false, setHighlighted }: Props) => {
  const { push } = useHistory();
  const { city, street, housenr, zip } = provider.address;
  return (
    <div className="bg-white p-3 border rounded shadow-md">
      <div className="flex flex-row pb-6">
        <Title as="h1" className="pr-2 text-2xl">
          {provider.farmName}
        </Title>
        {provider.bio && <OrganicAgriculture />}
        {setHighlighted && (
          <CloseIcon
            className="ml-auto mr-2"
            onClick={() => setHighlighted(null)}
          />
        )}
      </div>
      <div className="flex flex-row pb-6">
        <LocationOnOutlinedIcon className="mr-2" />
        <p>{`${street} ${housenr}, ${zip} ${city}`}</p>
      </div>
      {provider.pickupRange && (
        <div className="flex flex-row pb-6">
          <DirectionsCarIcon className="mr-2" />
          <p>{`Abholung möglich bei max. ${provider.pickupRange}km Distanz`}</p>
        </div>
      )}
      <div className="flex flex-row pb-6">
        <ScheduleOutlinedIcon className="mr-2" />
        <p>{`Mindestbeschäftigung: ${provider.minWorkPeriod}`}</p>
      </div>
      {!mini && (
        <div className="flex flex-row">
          {provider.crops.slice(0, 2).map((crop) => (
            <div key={crop} className="mr-2">
              <Crop type={crop} />
            </div>
          ))}
          {provider.crops.length > 2 && (
            <div className="flex mr-2 items-center">
              <MoreHorizIcon />
            </div>
          )}
          <PrimaryButton
            className="ml-auto mr-2"
            onClick={() => push(`/providers/${provider.providerId}`)}
          >
            Mehr Infos
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default ProviderPreview;
