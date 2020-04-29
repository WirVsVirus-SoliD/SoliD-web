import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { createRef } from "react";
import { Map } from "react-leaflet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProviders, setHighlightedProvider } from "~/actions/providers";
import LocateControl from "~/components/Map/LocateControl";
import MapBoxGLLayer from "~/components/Map/MapBoxGLLayer";
import MarkerCluster from "~/components/Map/MarkerCluster";
import SearchControl from "~/components/Map/SearchControl";
import { ProviderPreview } from "~/components/ProviderPreview";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

type Props = {
  getProviders: Function;
  setHighlightedProvider: Function;
  highlighted: {
    geometry: { coordinates: number[] };
    properties: object;
  } | null;
  geoJson: { features: object; type: object; crs: object } | null;
};

type State = {
  center: number[];
};

const containerStyle = { height: "calc(100% - 56px)" };

class LeafletMap extends React.Component<Props, State> {
  searchContainer: React.RefObject<HTMLInputElement>;
  locateContainer: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.state = {
      center: [51.163375, 10.447683]
    };
    this.searchContainer = createRef();
    this.locateContainer = createRef();
  }

  componentDidMount() {
    const { highlighted, getProviders } = this.props;
    getProviders();
    if (highlighted)
      this.setState({ center: highlighted.geometry.coordinates });
  }

  render() {
    const { center } = this.state;
    const { geoJson, setHighlightedProvider, highlighted } = this.props;
    return (
      <div className="w-full relative" style={containerStyle}>
        <Map
          center={center}
          zoom={7}
          className="h-full w-full"
          zoomControl={false}
          maxZoom={17}
        >
          <MapBoxGLLayer
            accessToken="pk.eyJ1IjoiZmxvcmlhbmdlcmhhcmR0IiwiYSI6ImNrODFmOTI2ZDBlcnozaG1zaGR1M29hZ3MifQ.ZXKPWVeVAfD_ABvIGbsQnQ"
            style="mapbox://styles/mapbox/streets-v9"
          />
          <MarkerCluster
            geoJson={geoJson}
            setHighlighted={setHighlightedProvider}
          />
          <SearchControl container={this.searchContainer} />
          <LocateControl container={this.locateContainer} />
        </Map>
        <div
          className="absolute top-0 mt-4 z-9999 h-10 left-1/2 transform -translate-x-1/2"
          ref={this.searchContainer}
        />
        <div
          className="absolute bottom-0 mb-4 z-9999 h-10 right-0 mr-4"
          ref={this.locateContainer}
        />
        {highlighted && (
          <div className="absolute bottom-0 mb-4 w-11/12 z-9999 left-1/2 transform -translate-x-1/2">
            <ProviderPreview
              providerGeoJson={highlighted}
              setHighlighted={setHighlightedProvider}
            />
          </div>
        )}
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    geoJson: state.getIn(["providers", "geoJson"]),
    highlighted: state.getIn(["providers", "highlighted"])
  };
}

function dispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProviders,
      setHighlightedProvider
    },
    dispatch
  );
}

export default connect(stateToProps, dispatchToProps)(LeafletMap);
