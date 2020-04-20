import React from "react";
import { useTypedSelector } from "~/reducers";
import { HelperDashboard, ProviderDashboard } from "./components";

const Dashboard = () => {
  const user = useTypedSelector((state) => state.get("user"));
  const isProvider = user.get("type") === "provider";

  return isProvider ? <ProviderDashboard /> : <HelperDashboard />;
};

export default Dashboard;
