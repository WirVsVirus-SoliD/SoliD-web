import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "~/actions/user";
import { PrimaryButton } from "~/components/Button";
import { Title } from "~/components/Title";
import { HelperProfileEdit } from "~/pages/private/components/index";

const HelperProfile = ({ data }: any) => {
  const dispatch = useDispatch();
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
        {/*
         <div className="flex">
         <EditIcon className="mr-3"/>
         <p>Bearbeiten</p>
         </div>
         */}
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
          <Avatar className="w-32 h-32" />
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs opacity-50">Vorname</p>
        <p>{account.get("firstName")}</p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs opacity-50">Nachname</p>
        <p>{account.get("lastName")}</p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs opacity-50">Handynummer</p>
        <p>{account.get("phone")}</p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs opacity-50">E-Mail</p>
        <p>{account.get("email")}</p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs opacity-50">Ich bin</p>
        <p>{data.get("employmentStatus")}</p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs opacity-50">Gesuchte Beschäftigung</p>
        <p>{data.get("partTime") ? "Teilzeit" : "Vollzeit"}</p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs opacity-50">Anreise</p>
        <p>
          {data.get("pickupRequired")
            ? "Auf Abholung angewiesen"
            : "Eigenständig"}
        </p>
      </div>

      <div className="mb-5">
        <p className="mb-1 text-xs opacity-50">Führerschein</p>
        <p>{data.get("driverLicense") ? "Ja" : "Nein"}</p>
      </div>

      {data.get("driverLicense") && (
        <div className="mb-5">
          <p className="mb-1 text-xs opacity-50">
            Bereitschaft für Fahrertätigkeiten
          </p>
          <p>{data.get("driverActivity") ? "Ja" : "Nein"}</p>
        </div>
      )}

      <PrimaryButton
        className="w-full mt-auto mb-20"
        onClick={() => dispatch(logOut())}
      >
        <Title as="h6">Ausloggen</Title>
      </PrimaryButton>
    </div>
  );
};

export default HelperProfile;
