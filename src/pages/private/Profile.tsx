import React from "react";
import { HelperProfile, ProviderProfile } from "~/components/Profile";
import { useTypedSelector } from "~/reducers";

const Profile = () => {
  const helper = true;
  const user = useTypedSelector((state) => state.get("user"));
  const data = user.get("data");

  return helper ? (
    <HelperProfile data={data} />
  ) : (
    <ProviderProfile data={data} />
  );
};

export default Profile;
