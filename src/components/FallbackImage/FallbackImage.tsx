import React, { useState } from "react";

type Props = {
  children?: any | undefined;
  src: any;
  width: any;
  height: any;
};
const FallbackImage = ({ src, width, height, children }: Props) => {
  const [error, setError] = useState(false);

  return (
    <>
      {error ? (
        <div>{children}</div>
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
