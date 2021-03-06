import EditIcon from "@material-ui/icons/Edit";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import React, { useState } from "react";
import { ArrowLeft } from "react-feather";
import { AvatarUpload } from "~/components/AvatarUpload";
import { PrimaryButton } from "~/components/Button";
import { Crop } from "~/components/Crop";
import { FallbackImage } from "~/components/FallbackImage";
import { Title } from "~/components/Title";
import api from "~/lib/api";
import { ProviderProfileEdit } from "~/pages/private/components/index";
import { ProviderDetailsSection } from "~/pages/public/components";

const ProviderProfile = ({ data }) => {
  const [editSection, setEditSection] = useState(null);
  const account = data.get("account");
  const address = data.get("address");

  if (typeof editSection === "number")
    return (
      <ProviderProfileEdit
        data={data.toJS()}
        setEditSection={setEditSection}
        editSection={editSection}
      />
    );

  if (editSection === "uploadProfilePicture")
    return (
      <div>
        <div className="flex flex-row items-center mb-6">
          <button
            className="rounded-full bg-white-primary p-2"
            onClick={() => setEditSection(null)}
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <AvatarUpload aspectRatio={2} close={() => setEditSection(null)} />
      </div>
    );

  return (
    <div className="h-full w-full">
      <div className="relative">
        <FallbackImage
          width="full"
          height="100%"
          src={api.media.downloadPicture(data.getIn(["account", "accountId"]))}
        >
          <div className="relative">
            <img
              className="w-full"
              src={require("../../../assets/images/ProviderPlaceholder.png")}
            />
            <PrimaryButton
              onClick={() => setEditSection("uploadProfilePicture")}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
            >
              <PhotoCameraIcon />
              Foto hochladen
            </PrimaryButton>
          </div>
        </FallbackImage>
        <PrimaryButton
          onClick={() => setEditSection("uploadProfilePicture")}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
        >
          <PhotoCameraIcon />
          Foto hochladen
        </PrimaryButton>
      </div>
      <div className="mx-4 pt-8">
        <div className="flex flex-row justify-between">
          <Title as="h2" className="text-xl mb-6" bold>
            Ansprechpartner
          </Title>
          <div className="text-brand mb-6" onClick={() => setEditSection(0)}>
            <EditIcon className="mr-2" />
            Bearbeiten
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs">Vorname</p>
          <p>{account.get("firstName")}</p>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs">Nachname</p>
          <p>{account.get("lastName")}</p>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs">Handynummer</p>
          <p>{account.get("mobileNumber")}</p>
        </div>

        <div className="flex flex-row justify-between">
          <Title as="h2" className="text-xl mb-6" bold>
            Betrieb
          </Title>
          <div className="text-brand mb-6" onClick={() => setEditSection(1)}>
            <EditIcon className="mr-2" />
            Bearbeiten
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs">Betriebsname</p>
          <p>{data.get("farmName")}</p>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs">Straße</p>
          <p>{address.get("street")}</p>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs">Hausnummer</p>
          <p>{address.get("housenr")}</p>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs">PLZ</p>
          <p>{address.get("zip")}</p>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs">Ort</p>
          <p>{address.get("city")}</p>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs">Website</p>
          <p>{data.get("url")}</p>
        </div>

        <div className="mb-5">
          <p className="mb-1 text-xs">Landwirtschafts-Typ</p>
          <p>{data.get("bio") ? "Biologisch" : "Konventionell"}</p>
        </div>

        <div className="flex flex-row justify-between mb-2">
          <Title as="h2" className="text-xl" bold>
            Kulturen
          </Title>
          <div className="text-brand mb-6" onClick={() => setEditSection(2)}>
            <EditIcon className="mr-2" />
            Bearbeiten
          </div>
        </div>
        <div className="mb-5">
          {data.get("crops").map((crop) => (
            <li key={crop} className="inline-block mr-4">
              <Crop type={crop} />
            </li>
          ))}
        </div>

        <div className="flex flex-row justify-between mb-2">
          <Title as="h2" className="text-xl" bold>
            Konditionen
          </Title>
          <div className="text-brand mb-6" onClick={() => setEditSection(3)}>
            <EditIcon className="mr-2" />
            Bearbeiten
          </div>
        </div>

        <ProviderDetailsSection
          title={"Tätigkeiten"}
          titleStyle={"mb-2"}
          text={data.get("workActivities").join(" ")}
        />
        <ProviderDetailsSection
          title={"Arbeitsbeginn"}
          titleStyle={"mb-2"}
          text={data.get("workingConditions")}
        />
        <ProviderDetailsSection
          title={"Übernachtungsmöglichkeiten"}
          titleStyle={"mb-2"}
          text={data.get("overnightInformation")}
        />
        <ProviderDetailsSection
          title={"Versorgung"}
          titleStyle={"mb-2"}
          text={data.get("providingInformation")}
        />
        <ProviderDetailsSection
          title={"Sprachen"}
          titleStyle={"mb-2"}
          text={data.get("languages")}
        />
        <ProviderDetailsSection
          title={"Sonstiges"}
          titleStyle={"mb-2"}
          text={data.get("otherInformation")}
        />
        <div className="h-20" />
      </div>
    </div>
  );
};

export default ProviderProfile;
