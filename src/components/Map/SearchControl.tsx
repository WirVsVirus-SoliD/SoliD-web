import * as Geocoder from "esri-leaflet-geocoder";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "esri-leaflet/dist/esri-leaflet";
import L from "leaflet";
import React, { useEffect } from "react";
import { useLeaflet } from "react-leaflet";

import "./SearchControl.css";

type Props = {
  container: React.RefObject<HTMLInputElement>;
};

const SearchControl = ({ container }: Props) => {
  const { map } = useLeaflet();

  useEffect(() => {
    const searchControl = new Geocoder.Geosearch({
      placeholder: "Standort suchen...",
      title: "",
      expanded: true,
      collapseAfterResult: false
    });

    const results = new L.LayerGroup().addTo(map);
    searchControl.on("results", function (data) {
      results.clearLayers();
      data.results.map((result) => results.addLayer(L.marker(result.latlng)));
    });
    const searchContainer = searchControl.onAdd(map);
    container.current.appendChild(searchContainer);
  }, [map, container]);

  return null;
};

export default SearchControl;
