import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { FallbackImage } from "~/components/FallbackImage";
import { Title } from "~/components/Title";
import api from "~/lib/api";
import { HelperProfileEdit } from "~/pages/private/components/index";

const HelperProfile = ({ data }: any) => {
  const account = data.get("account");
  const [editMode, setEditMode] = useState(false);

  if (editMode)
    return <HelperProfileEdit data={data.toJS()} setEditMode={setEditMode} />;

  return (
    <div className="mx-4 pt-8">
      <div className="mb-5">
        <Title as="h1" className="text-2xl mb-6" bold>
          Profil
        </Title>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="text-brand mb-6" onClick={() => setEditMode(true)}>
            <EditIcon className="mr-2" />
            Bearbeiten
          </div>
          <Title as="h2" className="text-xl mb-6" bold>
            {account.get("firstName")} {account.get("lastName")}
          </Title>
        </div>
        <div>
          <FallbackImage
            src={api.media.downloadPicture(
              data.getIn(["account", "accountId"])
            )}
            width="32"
            height="32"
          >
            <Avatar className="w-32 h-32" />
          </FallbackImage>
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
        <p>{account.get("phone")}</p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs">E-Mail</p>
        <p>{account.get("email")}</p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs">Ich bin</p>
        <p>{data.get("employmentStatus")}</p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs">Gesuchte Beschäftigung</p>
        <p>{data.get("partTime") ? "Teilzeit" : "Vollzeit"}</p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs">Anreise</p>
        <p>
          {data.get("pickupRequired")
            ? "Auf Abholung angewiesen"
            : "Eigenständig"}
        </p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs">Führerschein</p>
        <p>{data.get("driverLicense") ? "Ja" : "Nein"}</p>
      </div>

      {data.get("driverLicense") && (
        <div className="mb-5">
          <p className="mb-1 text-xs">Bereitschaft für Fahrertätigkeiten</p>
          <p>{data.get("driverActivity") ? "Ja" : "Nein"}</p>
        </div>
      )}
      <div className="h-20" />
    </div>
  );
};

export default HelperProfile;
