import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "~/actions/user";
import BaseButton from "~/components/Button/BaseButton";
import { Title } from "~/components/Title";

const ProviderProfile = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className="mx-4 pt-8">
      <div className="mb-5">
        <Title as="h1" className="text-2xl mb-6" bold>
          Meine Daten
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
            {data.get("farmName")}
          </Title>
        </div>
        <div>
          <Avatar className="w-32 h-32" />
        </div>
      </div>

      <BaseButton
        pill
        className="w-full bg-red-600 text-white mt-auto"
        onClick={() => dispatch(logOut())}
      >
        <Title as="h6">Ausloggen</Title>
      </BaseButton>
    </div>
  );
};

export default ProviderProfile;
