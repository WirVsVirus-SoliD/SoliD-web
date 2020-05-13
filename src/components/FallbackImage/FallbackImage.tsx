import React, { useState } from "react";

const FallbackImage = ({ src, width, height, ErrorComponent }) => {
  const [error, setError] = useState(false);

  return (
    <>
      {error ? (
        <ErrorComponent width={width} height={height} />
      ) : (
        <img
          src={src}
          width={width}
          height={height}
          onError={() => setError(true)}
        />
      )}
    </>
  );
};

export default FallbackImage;
