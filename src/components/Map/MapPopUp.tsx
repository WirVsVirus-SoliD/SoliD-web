import PropTypes from "prop-types";
import React from "react";

const propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.number,
  feature: PropTypes.object
};

const mapPopUpStyle = {
  backgroundColor: "white"
};

const MapPopUp = ({ id, feature, onClick }) => {
  return (
    <div style={mapPopUpStyle}>
      <p>{`Location ID: ${id}`}</p>
    </div>
  );
};

MapPopUp.propTypes = propTypes;
export default MapPopUp;
