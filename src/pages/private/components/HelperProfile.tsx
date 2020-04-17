import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "~/actions/user";
import { DangerButton } from "~/components/Button";
import { Title } from "~/components/Title";

const HelperProfile = ({ data }: any) => {
  const dispatch = useDispatch();
  const account = data.get("account");
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
          <Title as="h2" className="text-xl mb-6" bold>
            {account.get("firstName")} {account.get("lastName")}
          </Title>
        </div>
        <div>
          <Avatar className="w-32 h-32" />
        </div>
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

      <DangerButton
        className="w-full mt-auto"
        onClick={() => dispatch(logOut())}
      >
        <Title as="h6">Ausloggen</Title>
      </DangerButton>
    </div>
  );
};

export default HelperProfile;
