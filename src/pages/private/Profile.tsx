import React from "react";
import { useTypedSelector } from "~/reducers";
import { HelperProfile, ProviderProfile } from "./components";

const Profile = () => {
  const user = useTypedSelector((state) => state.get("user"));
  const data = user.get("data");
  const isProvider = user.get("type") === "provider";

  return isProvider ? (
    <ProviderProfile data={data} />
  ) : (
    <HelperProfile data={data} />
  );
};

export default Profile;
