import L from "leaflet";
import "mapbox-gl-leaflet";
import "mapbox-gl/dist/mapbox-gl.css";

import { GridLayer, withLeaflet } from "react-leaflet";

class MapBoxGLLayer extends GridLayer {
  createLeafletElement(props) {
    return L.mapboxGL(props);
  }
}

export default withLeaflet(MapBoxGLLayer);
