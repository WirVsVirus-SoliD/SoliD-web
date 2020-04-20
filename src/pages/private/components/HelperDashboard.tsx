import MessageIcon from "@material-ui/icons/Message";
import React, { useEffect, useState } from "react";
import { Title } from "~/components/Title";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";
import momentInstance from "~/lib/momentInstance";

const HelperDashboard = () => {
  const [data, setData] = useState({ inquiries: [], favorites: [] });

  useEffect(() => {
    (async () => {
      // TODO move to redux to display favorites and inquired providers on map
      const [inquiredResponse, favoriteResponse] = await Promise.all([
        axiosInstance.get(api.inquiries.collection),
        axiosInstance.get(api.favorites.collection)
      ]);
      setData({
        inquiries: inquiredResponse.data,
        favorites: favoriteResponse.data
      });
    })();
  }, []);

  const ProviderCard = ({ data, favorite = false }) => {
    return (
      <div className="flex flex-row shadow-md border border-solid rounded mb-4">
        <div className="mt-2 mb-4 mx-2">
          <Title as="h3">{data.provider.farmName}</Title>
          <div className="mt-2 flex flex-row text-center">
            <MessageIcon className="pr-2" />
            <p className="text-xs">{`Angefragt am ${momentInstance(
              data.applyDate
            ).format("L")}`}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full px-4 pt-8">
      <Title as="h2" className="text-2xl pt-6 mb-2">
        Meine Anfragen
      </Title>
      {data.inquiries.map((inquiry) => {
        return <ProviderCard key={inquiry.inquiryId} data={inquiry} />;
      })}
      <Title as="h2" className="text-2xl mb-2">
        Meine Merkliste
      </Title>
      {data.favorites.map((favorite) => {
        return <ProviderCard key={favorite.favoriteId} data={favorite} />;
      })}
    </div>
  );
};

export default HelperDashboard;
