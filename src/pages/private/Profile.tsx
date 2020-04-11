import React from "react";
import { HelperProfile, ProviderProfile } from "~/components/Profile";
import { useTypedSelector } from "~/reducers";

const Profile = () => {
  const isHelper = true;
  const user = useTypedSelector((state) => state.get("user"));
  const data = user.get("data");

  return isHelper ? (
    <HelperProfile data={data} />
  ) : (
    <ProviderProfile data={data} />
  );
};

export default Profile;
