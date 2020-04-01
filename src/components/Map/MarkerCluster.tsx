import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLeaflet } from "react-leaflet";
import "./MarkerCluster.css";

const mcg = L.markerClusterGroup();

const customMarker = new L.Icon({
  iconUrl: require("~/assets/icons/FarmMarker@2x.png"),
  iconSize: [50, 60],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

const MarkerCluster = ({ geoJson }) => {
  const { map } = useLeaflet();

  useEffect(() => {
    mcg.clearLayers();

    L.geoJson(geoJson, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.info);
      },
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.marker(latlng, { icon: customMarker });
      }
    }).addTo(mcg);

    // optionally center the map around the markers
    // map.fitBounds(mcg.getBounds());
    // // add the marker cluster group to the map
    map.addLayer(mcg);
  }, [geoJson, map]);

  return null;
};

MarkerCluster.propTypes = {
  geoJson: PropTypes.object.isRequired
};

export default MarkerCluster;
