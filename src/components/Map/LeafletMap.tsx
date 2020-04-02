import turfBbox from "@turf/bbox";
import { BBox } from "@turf/helpers";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { createRef } from "react";
import { Map } from "react-leaflet";
import LocateControl from "~/components/Map/LocateControl";
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
  geoJson: { features: object; type: object; crs: object } | null;
  bbox: BBox | null;
};

class LeafletMap extends React.Component<Props, State> {
  searchContainer: React.RefObject<HTMLInputElement>;
  locateContainer: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.state = {
      geoJson: null,
      bbox: null
    };
    this.searchContainer = createRef();
    this.locateContainer = createRef();
  }

  async componentDidMount() {
    const response = await axiosInstance.get(API.locations.geoJson);
    const geoJson = response.data;
    const bbox = turfBbox(geoJson);
    this.setState({ bbox, geoJson });
  }

  render() {
    const { geoJson } = this.state;
    return (
      <>
        <Map
          center={[51.163375, 10.447683]}
          zoom={7}
          className="h-100vh w-100vw"
          zoomControl={false}
          maxZoom={17}
        >
          <MapBoxGLLayer
            accessToken="pk.eyJ1IjoiZmxvcmlhbmdlcmhhcmR0IiwiYSI6ImNrODFmOTI2ZDBlcnozaG1zaGR1M29hZ3MifQ.ZXKPWVeVAfD_ABvIGbsQnQ"
            style="mapbox://styles/mapbox/streets-v9"
          />
          <MarkerCluster geoJson={geoJson} />
          <SearchControl container={this.searchContainer} />
          <LocateControl container={this.locateContainer} />
        </Map>
        <div
          className="absolute top-0 mt-4 z-9999 h-10 left-1/2 transform -translate-x-1/2"
          ref={this.searchContainer}
        />
        <div
          className="absolute top-0 mt-4 z-9999 h-10 right-0 mr-4"
          ref={this.locateContainer}
        />
      </>
    );
  }
}

export default LeafletMap;
