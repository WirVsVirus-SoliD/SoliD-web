import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useEffect } from "react";
import { useLeaflet } from "react-leaflet";
import "./MarkerCluster.css";

const mcg = L.markerClusterGroup();

const customMarker = new L.Icon({
  iconUrl: require("~/assets/icons/FarmMarker.svg"),
  iconSize: [50, 60],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

type Props = {
  geoJson: object;
  setHighlighted: Function;
};

const MarkerCluster = ({ geoJson, setHighlighted }: Props) => {
  const { map } = useLeaflet();

  useEffect(() => {
    mcg.clearLayers();

    L.geoJson(geoJson, {
      onEachFeature: function (feature, layer) {
        layer.on("click", function (e) {
          setHighlighted(feature);
        });
      },
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, { icon: customMarker });
      },
      coordsToLatLng: function (coords) {
        // latitude , longitude, altitude
        // return new L.LatLng(coords[1], coords[0], coords[2]); //Normal behavior
        return new L.LatLng(coords[0], coords[1], coords[2]);
      }
    }).addTo(mcg);

    // optionally center the map around the markers
    // map.fitBounds(mcg.getBounds());
    // // add the marker cluster group to the map
    map.addLayer(mcg);
  }, [geoJson, map, setHighlighted]);

  return null;
};

export default MarkerCluster;
