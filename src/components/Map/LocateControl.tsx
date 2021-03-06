import * as Locatecontrol from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import React, { useEffect } from "react";
import { useLeaflet } from "react-leaflet";

import "./LocateControl.css";

type Props = {
  container: React.RefObject<HTMLInputElement>;
};

const LocateControl = ({ container }: Props) => {
  const { map } = useLeaflet();

  useEffect(() => {
    const locatecontrol = new Locatecontrol({
      strings: {
        title: "Standort",
        metersUnit: "m",
        popup: "Sie sind innerhalb von {distance}{unit} von diesem Punkt",
        outsideMapBoundsMsg:
          "Ihr Standort befindet sich außerhalb des sichtbaren Bereichs"
      },
      icon: "locate-control-icon",
      iconLoading: "locate-control-icon-loading"
    });

    const locateContainer = locatecontrol.onAdd(map);
    container.current.appendChild(locateContainer);
  }, [map, container]);

  return null;
};

export default LocateControl;
