import React from "react";
import { HelperProfile, ProviderProfile } from "~/components/Profile";
import { useTypedSelector } from "~/reducers";

const Profile = () => {
  const helper = true;
  // FIXME Use user data from store
  const user = useTypedSelector((state) => state.user);

  return helper ? <HelperProfile /> : <ProviderProfile />;
};

export default Profile;
