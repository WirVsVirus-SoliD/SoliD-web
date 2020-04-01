import turfBbox from "@turf/bbox";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { Map } from "react-leaflet";
import MapBoxGLLayer from "~/components/Map/MapBoxGLLayer";
import MarkerCluster from "~/components/Map/MarkerCluster";
import SearchControl from "~/components/Map/SearchControl";
import API from "~/lib/api";
import axiosInstance from "~/lib/axiosInstance";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

type Props = {};

type State = {
  points: { features: object; type: object; crs: object } | null;
  bbox: Array<number> | null;
};

const mapStyles = { height: "100vh", width: "100vw" };

class LeafletMap extends React.Component<Props, State> {
  state = {
    points: null,
    bbox: null
  };

  async componentDidMount() {
    const response = await axiosInstance.get(API.locations.geoJson);
    const points = response.data;
    const bbox = turfBbox(points);
    this.setState({ bbox, points });
  }

  render() {
    const { points } = this.state;
    return (
      <Map
        center={[51.163375, 10.447683]}
        zoom={7}
        style={mapStyles}
        zoomControl={false}
        maxZoom={17}
      >
        <MapBoxGLLayer
          accessToken="pk.eyJ1IjoiZmxvcmlhbmdlcmhhcmR0IiwiYSI6ImNrODFmOTI2ZDBlcnozaG1zaGR1M29hZ3MifQ.ZXKPWVeVAfD_ABvIGbsQnQ"
          style="mapbox://styles/mapbox/streets-v9"
        />
        <MarkerCluster geoJson={points} />
        <SearchControl />
      </Map>
    );
  }
}

export default LeafletMap;