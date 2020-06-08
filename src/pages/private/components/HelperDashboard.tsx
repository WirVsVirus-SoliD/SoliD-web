import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import MessageIcon from "@material-ui/icons/Message";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getFavorites } from "~/actions/favorites";
import { getInquiries } from "~/actions/inquiries";
import { Title } from "~/components/Title";
import api from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";
import momentInstance from "~/lib/momentInstance";
import { useTypedSelector } from "~/reducers";

const ProviderCard = ({ data, favorite = false, refreshData }) => {
  const provider = data.provider;
  const { street, housenr, zip, city } = provider.address;
  const { push } = useHistory();
  const [anchorEl, open] = useState(null);

  const cancelInquiry = () => {
    axiosInstance.delete(api.inquiries.show(data.inquiryId)).then(() => {
      refreshData();
      open(null);
    });
  };

  const inquire = () => {
    axiosInstance
      .post(api.inquiries.collection, { providerId: provider.providerId })
      .then(() => {
        refreshData();
        open(null);
      });
  };

  const removeFromFavorite = () => {
    axiosInstance.delete(api.favorites.show(data.favoriteId)).then(() => {
      refreshData();
      open(null);
    });
  };

  return (
    <div className="flex flex-col shadow-md border border-solid rounded mt-2 mb-4 p-2">
      <div className="flex flex-row justify-between">
        <Title as="h3">{provider.farmName}</Title>
        <Button onClick={(e) => open(e.currentTarget)}>
          <MoreVertIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => open(null)}
        >
          <MenuItem onClick={() => push(`/providers/${provider.providerId}`)}>
            Hofprofil ansehen
          </MenuItem>
          {!favorite && (
            <MenuItem onClick={cancelInquiry}>Anfrage stornieren</MenuItem>
          )}
          {favorite && <MenuItem onClick={inquire}>Anfrage versenden</MenuItem>}
          {favorite && (
            <MenuItem onClick={removeFromFavorite}>
              Von Merkliste entfernen
            </MenuItem>
          )}
        </Menu>
      </div>
      <div className="flex flex-row">
        <LocationOnOutlinedIcon className="mr-2" />
        <p>{`${street} ${housenr}, ${zip} ${city}`}</p>
      </div>
      {favorite ? (
        <div className="mt-2 flex flex-row text-center">
          <FavoriteIcon className="pr-2 text-red-500" />
          <p>{`Gemerkt am ${momentInstance(data.markedDate).format("L")}`}</p>
        </div>
      ) : (
        <div className="mt-2 flex flex-row text-center">
          <MessageIcon className="pr-2" />
          <p>{`Angefragt am ${momentInstance(data.applyDate).format("L")}`}</p>
        </div>
      )}
    </div>
  );
};

const HelperDashboard = () => {
  const dispatch = useDispatch();
  const favorites = useTypedSelector((state) => state.get("favorites"));
  const inquiries = useTypedSelector((state) => state.get("inquiries"));

  const refreshData = () => {
    dispatch(getInquiries());
    dispatch(getFavorites());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const renderInquiries = () => {
    return inquiries.get("items")?.map((inquiry) => {
      return (
        <ProviderCard
          key={inquiry.inquiryId}
          data={inquiry}
          refreshData={refreshData}
        />
      );
    });
  };

  const renderFavorites = () => {
    return favorites.get("items")?.map((favorite) => {
      return (
        <ProviderCard
          key={favorite.favoriteId}
          data={favorite}
          favorite={true}
          refreshData={refreshData}
        />
      );
    });
  };

  const renderLoading = () => {
    return (
      <div className="h-full w-full mt-64 text-center">
        <CircularProgress />
      </div>
    );
  };

  return (
    <div className="h-full w-full px-4 pt-8">
      <div className="mb-8">
        <Title as="h2" className="text-2xl pt-6 mb-4">
          Meine Anfragen
        </Title>
        {inquiries.get("loading") ? renderLoading() : renderInquiries()}
      </div>
      <div className="mb-8">
        <Title as="h2" className="text-2xl mb-4">
          Meine Merkliste
        </Title>
        {favorites.get("loading") ? renderLoading() : renderFavorites()}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default HelperDashboard;
