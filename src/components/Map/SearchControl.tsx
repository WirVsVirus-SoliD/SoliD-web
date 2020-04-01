import * as Geocoder from "esri-leaflet-geocoder";
import "esri-leaflet/dist/esri-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { useLeaflet } from "react-leaflet";

const SearchControl = () => {
  const { map } = useLeaflet();

  useEffect(() => {
    const searchControl = new Geocoder.Geosearch({
      placeholder: "",
      title: "",
      expanded: true,
      collapseAfterResult: false
    }).addTo(map);

    const results = new L.LayerGroup().addTo(map);
    searchControl.on("results", function (data) {
      results.clearLayers();
      data.results.map((result) => results.addLayer(L.marker(result.latlng)));
    });
  }, [map]);
  return null;
};

export default SearchControl;
