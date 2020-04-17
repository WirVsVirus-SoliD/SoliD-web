import React, { useEffect, useState } from "react";
import { Title } from "~/components/Title";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";

const HelperDashboard = () => {
  const [data, setData] = useState({ inquired: [], favorites: [] });

  useEffect(() => {
    (async () => {
      // TODO move to redux to display favorites and inquired providers on map
      const [inquiredResponse, favoriteResponse] = await Promise.all([
        axiosInstance.get(api.helpers.inquired),
        axiosInstance.get(api.helpers.favorites)
      ]);
      setData({
        inquired: inquiredResponse.data,
        favorites: favoriteResponse.data
      });
    })();
  }, []);

  const renderInquiries = () => {
    return (
      <>
        {data.inquired.map((inquiry) => {
          // TODO currently the helper sees only the provider as the inquiry
          //  change when he gets the full inquiry object from backend
          return <div>{inquiry.farmName}</div>;
        })}
      </>
    );
  };

  const renderFavorites = () => {
    return (
      <>
        {data.favorites.map((favorite) => {
          return (
            <div key={favorite.favoriteId}>{favorite.provider.farmName}</div>
          );
        })}
      </>
    );
  };

  return (
    <div className="mx-4 pt-8">
      <Title as="h2" className="text-2xl mb-2">
        Meine Anfragen
      </Title>
      {renderInquiries()}
      <Title as="h2" className="text-2xl mb-2">
        Meine Merkliste
      </Title>
      {renderFavorites()}
    </div>
  );
};

export default HelperDashboard;
