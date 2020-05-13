import React, { useState } from "react";

type Props = {
  ErrorComponent?: any | undefined;
  src: any;
  width: any;
  height: any;
};
const FallbackImage = ({ src, width, height, ErrorComponent }: Props) => {
  const [error, setError] = useState(false);

  return (
    <>
      {error ? (
        ErrorComponent && <ErrorComponent width={width} height={height} />
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
