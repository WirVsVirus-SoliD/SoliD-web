import React from "react";
import { HelperProfile, ProviderProfile } from "~/components/Profile";
import { useTypedSelector } from "~/reducers";

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
